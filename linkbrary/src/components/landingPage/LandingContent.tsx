import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";

interface SectionProps {
  bgColor?: string;
}

interface FeatureWrapperProps {
  reverse?: boolean;
}

const Section = styled.section<SectionProps>`
  padding: 50px 25px;
  background-color: ${({ bgColor }) => bgColor || "white"};

  ${({ theme }) => theme.media.tablet} {
    padding: 50px 54px;
  }
`;

const FeatureWrapper = styled.div<FeatureWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 1040px;
  margin: 0 auto;

  ${({ theme }) => theme.media.tablet} {
    flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
    justify-content: space-between;
    align-items: center;
  }
`;

const TextContent = styled.div`
  text-align: center;

  h3 {
    font-size: ${({ theme }) => theme.fontSize.fz24};
    font-weight: bold;
    margin-bottom: 8px;
    br {
      display: none;
    }
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.fz14};
    color: ${({ theme }) => theme.color.gray50};
    line-height: ${({ theme }) => theme.lineHeight.lh140};
  }

  ${({ theme }) => theme.media.tablet} {
    min-width: 250px;
    text-align: left;

    h3 {
      font-size: ${({ theme }) => theme.fontSize.fz32};
      font-weight: bold;
      margin-bottom: 16px;
      br {
        display: block;
      }
    }
    p {
      font-size: ${({ theme }) => theme.fontSize.fz16};
      br {
        display: none;
      }
    }
  }
  ${({ theme }) => theme.media.desktop} {
    min-width: auto;
    h3 {
      font-size: ${({ theme }) => theme.fontSize.fz42};
    }
    p {
      font-size: ${({ theme }) => theme.fontSize.fz16};
      br {
        display: block;
      }
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 650px;

  picture,
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export default function LandingContent() {
  return (
    <>
      <Section>
        <FeatureWrapper>
          <TextContent>
            <h3>
              원하는 링크를 <br />
              저장하세요
            </h3>
            <p>
              나중에 읽고 싶은 글, 다시 보고 싶은 영상, <br /> 사고 싶은 옷,
              기억하고 싶은 모든 것을
              <br /> 한 공간에 저장하세요.
            </p>
          </TextContent>
          <ImageWrapper>
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet="/images/cont_pc_img.png"
              />
              <img src="/images/cont_img.png" alt="링크 저장" />
            </picture>
          </ImageWrapper>
        </FeatureWrapper>
      </Section>
      <Section bgColor="#f5f5f5">
        <FeatureWrapper reverse>
          <TextContent>
            <h3>
              링크를 폴더로 <br /> 관리하세요
            </h3>
            <p>
              나만의 폴더를 무제한으로 만들고 <br /> 다양하게 활용할 수
              있습니다.
            </p>
          </TextContent>
          <ImageWrapper>
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet="/images/cont_pc_img2.png"
              />
              <img src="/images/cont_img2.png" alt="폴더 관리" />
            </picture>
          </ImageWrapper>
        </FeatureWrapper>
      </Section>
      <Section>
        <FeatureWrapper>
          <TextContent>
            <h3>
              저장한 링크를 <br /> 공유해 보세요
            </h3>
            <p>
              여러 링크를 폴더에 담고 공유할 수 있습니다. <br /> 가족, 친구,
              동료들에게 쉽고 빠르게 링크를 <br />
              공유해 보세요
            </p>
          </TextContent>
          <ImageWrapper>
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet="/images/cont_pc_img3.png"
              />
              <img src="/images/cont_img3.png" alt="링크 공유" />
            </picture>
          </ImageWrapper>
        </FeatureWrapper>
      </Section>
      <Section bgColor="#f5f5f5">
        <FeatureWrapper reverse>
          <TextContent>
            <h3>
              저장한 링크를 <br /> 검색해 보세요
            </h3>
            <p>중요한 정보들을 검색으로 쉽게 찾아보세요.</p>
          </TextContent>
          <ImageWrapper>
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet="/images/cont_pc_img4.png"
              />
              <img src="/images/cont_img4.png" alt="폴더 관리" />
            </picture>
          </ImageWrapper>
        </FeatureWrapper>
      </Section>
    </>
  );
}
