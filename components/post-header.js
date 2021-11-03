import parse from "html-react-parser";
import Avatar from "../components/avatar";
import Date from "../components/date";
import CoverImage from "../components/cover-image";
import PostTitle from "../components/post-title";
import Categories from "../components/categories";
import PostExcerpt from "./post-excerpt";

export default function PostHeader({
  title,
  excerpt,
  coverImage,
  date,
  author,
  categories,
}) {
  return (
    <header
      id="entry-header"
      className="max-w-6xl mx-auto entry-header no-padding-bottom"
    >
      {/* <div className="entry-header-container"> */}
      <PostTitle>{title}</PostTitle>
      <Categories categories={categories} />
      <PostExcerpt>{excerpt}</PostExcerpt>
      <div className="hidden md:block md:mb-12 mt-5">
        <Avatar author={author} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0 mt-3">
        <CoverImage title={title} coverImage={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar author={author} />
        </div>
        <div className="mb-6 text-lg">
          Posted <Date dateString={date} />
        </div>
      </div>
      {/* </div> */}
    </header>
  );
}
