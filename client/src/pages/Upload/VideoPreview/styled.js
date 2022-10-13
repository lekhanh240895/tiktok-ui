import styled from 'styled-components';

export const Wrapper = styled.div`
    .video-preview {
        width: 284px;
        height: 556px;
        position: relative;

        .video {
            height: 486px;
            width: 259px;
            background-color: rgb(0, 0, 0);
            object-fit: contain;
            margin-left: 12px;
            margin-top: 13px;
            border-radius: 0.5px;
        }

        .title {
            position: absolute;
            top: 40px;
            left: 0;
            right: 0;
            z-index: 99;
            color: white;
            text-align: center;
            font-size: 1.2rem;
            opacity: 0.6;

            span {
                margin-right: 20px;
                color: rgb(255 255 255 / 75%);
            }
        }

        .meta-data {
            position: absolute;
            bottom: 80px;
            left: 25px;
            z-index: 2;
            opacity: 0.6;
            color: white;
            font-size: 1.2rem;

            .username {
                margin-bottom: 4px;
            }
            .caption {
                margin-bottom: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
            }

            .sound-container {
                display: flex;
                align-items: center;

                .sound {
                    margin-left: 6px;
                    max-width: 150px;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
        }
        .avatar-container {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 20px;

            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                opacity: 0.6;
                object-fit: contain;
            }
        }
        .album-container {
            position: absolute;
            bottom: 74px;
            right: 20px;
            opacity: 0.6;

            .album {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: conic-gradient(
                    from 90deg at 50% 50%,
                    rgb(57, 57, 57) -40.11deg,
                    rgb(21, 21, 21) 47.27deg,
                    rgb(57, 57, 57) 143.02deg,
                    rgb(22, 22, 22) 227.49deg,
                    rgb(57, 57, 57) 319.89deg,
                    rgb(21, 21, 21) 407.27deg
                );
            }

            .album-img {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                object-fit: contain;
                position: absolute;
                top: 8px;
                right: 8px;
                animation: rotate 2s linear infinite;
            }
        }
        .music-bar-icon {
            position: absolute;
            top: 50%;
            -webkit-transform: translateY(-40%);
            -ms-transform: translateY(-40%);
            transform: translateY(20%);
            right: 25px;
            opacity: 0.6;
        }

        .tiktok-app-frame {
            background-image: url(data:image/png;base64,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cASOwBE44AgcgSNwBI7AAUfgCByBI3AEDjgCR+AIHIEjcMAROAJH4AgcgQOOwBE4AkfgCBxwBI7AETgCBxxwwBE4AkfgCBxwBI7AETgCR+CAI3AEjsAROAIHHIEjcASOwBE44AgcgSNwBI7AAUfgCByBI3AEDjgCR+AIHIEjcMAROAJH4AgccMABR+AIHIEjcMAROAJH4AgcgQOOwBE4AkfgCBxwBI7AETgCR+CAI3AEjsAROAIHHIEjcASOwBE44AgcgSNwBI61AwccgSNwBI7AAUfgCByBI3AEDjgCR+AIHIEjcMAROAJH4AgcgQOOwBE4AkfgCBxwBI7AETgCR+CAI3AEjsAROAIHHIEjcASOwAEHHHAEjsAROAIHHIEjcASOwBE44AgcgSNwBI7AAUfgCByBI3AEDjgCR+AIHIEjcMAROAJH4AgcgQOOwBE4AkfgCBxwBI7AETgCBxyBI3AEjsAROOAIHIEjcASOwAFH4AgcgSNwBA44AkfgCByBI3DAETgCR+AIHIEDjsAROAJH4AgccASOwBE4AgcccMAROAJH4AgccASOwBE4AkfggCNwBI7AETgCBxyBI3AEjsAROOAIHIEjcASOwAFH4AgcgSNwBA44AkfgCByBI3DAETgCR+AIHHAEjsAROAJH4IAjcASOwBE4AgccgSNwBI7AETjgCByBI3AEjsABR+AIHIEjcAQOOAJH4AgcgSNwwBE4AkfgCBxwwAFH4AgcgSNwwBE4AkfgCByBA47AETgCR+AIHHAEjsAROAJH4IAjcASOwBE4AgccgSNwBI7AETjgCByBI3AEjsABR+AIHIEjcMABBxyBI3AEjsABR+AIHIEjcAQOOAJH4AgcgSNwwBE4AkfgCByBA47AETgCR+AIHHAEjsAROAJH4IAjcASOwBE41g4ccASOwBE4AgccgSNwBI7AETjgCByBI3AEjsABR+AIHIEjcAQOOAJH4AgcgSNwwBE4AkfgCByBA47AETgCR+AIHHAEjsAROAIHHHDAETgCR+AIHHAEjsAROAJH4IAjcASOwBE4AgccgSNwBI7AETjgCByBI3AEjsABR+AIHIEjcAQOOAJH4AgcgSNwwBE4AkfgCBxwBI7AETgCR+CAI3AEjsAROAIHHIEjcASOwBE44AgcgSNwBI7AAUfgCByBI3AEDjgCR+AIHIEjcMAROAJH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);
            background-size: cover;
            height: 100%;
            width: 100%;
            min-width: 100%;
            min-height: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            z-index: 1;
        }
        .video-controls {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 3;
            top: 0px;
            overflow: hidden;

            .video-controls-bottom {
                position: absolute;
                bottom: 5px;
                width: calc(100% - 10px);
                margin-left: 5px;
                margin-right: 5px;
                height: 90px;
                transition: all 0.3s ease-out 0s;
                background: linear-gradient(
                    rgba(0, 0, 0, 0.15) 0%,
                    rgba(0, 0, 0, 0.65) 100%
                );
                border-radius: 8px 8px 20px 20px;
                opacity: 0;

                .detail {
                    position: absolute;
                    height: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: calc(100% - 45px);
                    transform: translateX(-50%);
                    left: 50%;
                    bottom: 50px;

                    .left {
                        display: flex;
                        align-items: center;
                        height: 100%;

                        .play {
                            line-height: 0;
                            cursor: pointer;
                            img {
                                width: 1.6rem;
                                height: 1.6rem;
                            }
                        }
                        .time {
                            color: #fff;
                            padding: 0px 6px;
                            margin-top: 2px;
                            font-size: 1.4rem;
                        }
                    }

                    .right {
                        display: flex;
                        align-items: center;
                        .volume {
                            margin-right: 14px;
                        }
                        .fullscreen,
                        .volume {
                            line-height: 0;
                            cursor: pointer;
                            img {
                                width: 1.6rem;
                                height: 1.6rem;
                            }
                        }
                    }
                }
            }

            &:hover > .video-controls-bottom {
                opacity: 1;
                color: red;
            }
        }

        .progress-wrap {
            position: absolute;
            bottom: 20px;
            width: calc(100% - 40px);
            left: 50%;
            transform: translateX(-50%);
            cursor: pointer;

            .progress {
                width: 100%;
                height: 3px;
                background-color: rgb(255 255 255 / 20%);
                position: absolute;
                z-index: 2;
            }

            .circle {
                position: absolute;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                top: -1px;
                background-color: #fff;
                box-shadow: rgb(0 0 0 / 10%) -1px 1px 1px;
            }

            .bar {
                position: absolute;
                z-index: 1;
                background-color: #fff;
                height: 3px;
            }
        }
    }
`;
