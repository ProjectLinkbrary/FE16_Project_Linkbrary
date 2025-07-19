import styled from "@emotion/styled";

export const Button = styled.button`
  border-radius: 40px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: ${({ theme }) => theme.lineHeight.lh140};
  font-size: ${({ theme }) => theme.fontSize.fz14};
  font-weight: 600;

  @media (min-width: 768px) {
    padding: 12px 24px;
    font-size: ${({ theme }) => theme.fontSize.fz18};
  }
`;

export const PrimaryButton = styled(Button)`
  line-height: ${({ theme }) => theme.lineHeight.lh140};
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.gray90};

  &:hover {
    background-color: ${({ theme }) => theme.color.gray10};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.gray30};
  }
`;

export const SecondaryButton = styled(Button)`
  font-size: ${({ theme }) => theme.fontSize.fz14};
  background-color: ${({ theme }) => theme.color.gray60};
  color: ${({ theme }) => theme.color.white};

  &:hover {
    background-color: ${({ theme }) => theme.color.gray80};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.black};
  }
`;

export const LightButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.gray80};
  color: ${({ theme }) => theme.color.white};

  &:hover {
    background-color: ${({ theme }) => theme.color.gray90};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.black};
  }
`;
