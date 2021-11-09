import handleRequest from './handleRequest';

export async function getPreviewPost(id, idType = 'DATABASE_ID') {
  const data = await handleRequest(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    },
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const data = await handleRequest(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getAllPostsForHome(preview) {
  const data = await handleRequest(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    },
  );

  return data?.posts;
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === 'draft';
  const isRevision = isSamePost && postPreview?.status === 'publish';
  const data = await handleRequest(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
      seo {
        title
        metaDesc
        fullHead
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
  // Only some of the fields of a revision are considered as there are some inconsistencies
  isRevision
    ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
    : ''
}
      }
      posts(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    },
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 4 posts, remove the last one
  if (data.posts.edges.length > 3) data.posts.edges.pop();

  return data;
}

export async function getPageDataByUri(uri) {
  const data = await handleRequest(`
  query Pages {
    pageBy(uri: "${uri}") {
      id
      title
      content
      seo {
        title
        metaDesc
        fullHead
      }
    }
  }
  `);
  return data?.pageBy;
}

export async function getPrimaryMenu() {
  const data = await handleRequest(`
  query TopMenu {
    menus(where: {slug: "top-menu"}) {
      edges {
        node {
          id
          slug
          menuItems {
            edges {
              node {
                id
                label
                path
              }
            }
          }
        }
      }
    }
  }
  `);
  return data?.menus?.edges[0]?.node?.menuItems?.edges;
}

export async function getCategories() {
  const data = await handleRequest(`
  query Categories {
    categories {
      nodes {
        id
        slug
        name
        posts {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    }
  }
  `);
  return data?.categories?.nodes;
}

export async function sendMail(subject, body, mutationId = 'contact') {
  const fromAddress = 'noreply@brightseed.io';
  const toAddress = 'contact@brightseed.io';
  const data = await handleRequest(
    `
    mutation SendEmail($input: SendEmailInput!) {
      sendEmail(input: $input) {
        message
        origin
        sent
      }
    }
  `,
    {
      variables: {
        input: {
          clientMutationId: mutationId,
          from: fromAddress,
          to: toAddress,
          body,
          subject,
        },
      },
    },
  );

  return data?.sendEmail;
}
