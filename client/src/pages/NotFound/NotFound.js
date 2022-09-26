import { Link } from 'react-router-dom';
import images from '~/assets/images';
import Button from '~/components/Button';
import { PlayIcon } from '~/components/Icons';
import { Wrapper } from './styled';

export default function NotFound() {
    return (
        <Wrapper bgImage={images.noPageBgImage}>
            <div className="container">
                <p className="not-found">
                    <span>4</span>
                    <img
                        src={images.noPageImage}
                        alt="404"
                        className="smile-img"
                    />
                    <span>4</span>
                </p>
                <p className="not-found-desc">Couldn't find this page</p>
                <p className="recommend-desc">
                    Check out more trending videos on TikTok
                </p>

                <Link to="/" className="btn-wrapper">
                    <Button
                        primary
                        leftIcon={<PlayIcon width="1.8rem" height="1.8rem" />}
                        className="back-home-btn"
                    >
                        <b>Watch now</b>
                    </Button>
                </Link>
            </div>
        </Wrapper>
    );
}
