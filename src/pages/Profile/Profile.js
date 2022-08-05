import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { CheckedIcon, EditIcon, MoreIcon, ShareIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { useAppContext } from '~/store/AppContext';
import { configNumber } from '~/services';

export default function Profile() {
    const [{ users, videos }] = useAppContext();

    const { nickname } = useParams();

    const user = users.find((user) => user.nickname === nickname);

    if (!user) return;

    const userVideos = videos.filter((video) => video.userId === user.id);

    return (
        <Container>
            <Header>
                <SharedInfo>
                    <Image src={user.avatar} alt={user.full_name} />
                    <ShareTitle>
                        <h2>
                            {user.nickname}
                            {user.tick && <CheckedIcon />}
                        </h2>
                        <h4>{user.full_name}</h4>

                        <Button
                            secondary
                            leftIcon={<EditIcon width="2rem" height="2rem" />}
                        >
                            Edit profile
                        </Button>
                    </ShareTitle>
                </SharedInfo>

                <div>
                    <UserStats>
                        <span>{configNumber(user.followingIDs?.length)}</span>
                        Following
                    </UserStats>
                    <UserStats>
                        <span>{configNumber(user.followerIDs?.length)}</span>
                        Followers
                    </UserStats>
                    <UserStats>
                        <span>{configNumber(user.likes_count)}</span>Likes
                    </UserStats>
                </div>

                <Bio>{user.bio}</Bio>

                <HeaderActions>
                    <span>
                        <ShareIcon width="2.4rem" height="2.4rem" />
                    </span>

                    <span>
                        <MoreIcon width="2.4rem" height="2.4rem" />
                    </span>
                </HeaderActions>
            </Header>

            <VideoList>
                {userVideos.map((video) => (
                    <VideoItem key={video.id}>
                        <VideoWrapper>
                            <video
                                src={video.src}
                                controls
                                muted
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </VideoWrapper>

                        <VideoTitle>{video.title}</VideoTitle>
                    </VideoItem>
                ))}
            </VideoList>
        </Container>
    );
}

const Container = styled.div``;

const Header = styled.div`
    margin-bottom: 20px;
    padding-right: 92px;
    position: relative;
    max-width: 624px;
`;

const SharedInfo = styled.div`
    display: flex;
    margin-bottom: 22px;

    img {
        width: 116px;
        height: 116px;
        border-radius: 50%;
    }
`;

const ShareTitle = styled.div`
    margin-left: 20px;
    h2 {
        font-weight: 700;
        font-size: 3.2rem;
        line-height: 38px;
        svg {
            margin-left: 12px;
        }
    }
    h4 {
        font-weight: 600;
        font-size: 1.8rem;
        line-height: 25px;
        margin-bottom: 20px;
    }
`;

const UserStats = styled.span`
    margin-right: 20px;
    span {
        font-weight: 700;
        font-size: 1.8rem;
        margin-right: 6px;
    }
`;

const Bio = styled.p`
    margin-top: 10px;
`;

const HeaderActions = styled.div`
    position: absolute;
    right: 52px;
    top: 12px;

    span:first-child {
        color: #fff;
    }
    span:last-child {
        margin-left: 20px;
        display: none;
    }
`;

const VideoList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(184px, 1fr));
    gap: 24px 16px;
    width: 100%;
`;

const VideoItem = styled.li`
    margin-top: 10px;
    height: 100%;
    width: 100%;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

const VideoWrapper = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 4px;
`;

const VideoTitle = styled.p`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 21px;
    font-size: 1.4rem;
`;
