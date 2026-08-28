import CurvyArrow from "/curvy-arrow.png";

type DecorativeArrowProps = {
  className?: string;
};

const DecorativeArrow = ({ className }: DecorativeArrowProps) => {
  return <img src={CurvyArrow} alt="" aria-hidden="true" className={className} />;
};

export default DecorativeArrow;
