import { useRouter } from 'next/router';
import {
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
  RedditIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import Container from './container';
import { CMS_URL } from '../lib/constants';

export default function PostThanksText() {
  const router = useRouter();
  const url = `${CMS_URL}${router.asPath}`;

  return (
    <section id="thanks-text" className="no-padding-top">
      <Container className="mx-auto">
        <div className="text-center">
          <div className="leading-tight">
            <h1 className="blog-thanks-text">Thanks for reading!</h1>
            <div className="flex flex-row justify-center">
              <div className="p-1">
                <FacebookShareButton url={url}>
                  <FacebookIcon round size={32} />
                </FacebookShareButton>
              </div>
              <div className="p-1">
                <LineShareButton url={url}>
                  <LineIcon round size={32} />
                </LineShareButton>
              </div>
              <div className="p-1">
                <LinkedinShareButton url={url}>
                  <LinkedinIcon round size={32} />
                </LinkedinShareButton>
              </div>
              <div className="p-1">
                <RedditShareButton url={url}>
                  <RedditIcon round size={32} />
                </RedditShareButton>
              </div>
              <div className="p-1">
                <TumblrShareButton url={url}>
                  <TumblrIcon round size={32} />
                </TumblrShareButton>
              </div>
              <div className="p-1">
                <TwitterShareButton url={url}>
                  <TwitterIcon round size={32} />
                </TwitterShareButton>
              </div>
              <div className="p-1">
                <WhatsappShareButton url={url}>
                  <WhatsappIcon round size={32} />
                </WhatsappShareButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
