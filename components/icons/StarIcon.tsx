interface StarIconProps {
  isSelected: boolean;
  handleClick: (movieId: number) => void;
  movieId: number;
}

const StarIcon = ({
  isSelected,
  handleClick,
  movieId,
}: StarIconProps): JSX.Element => {
  return (
    <a onClick={() => handleClick(movieId)}>
      <span className={isSelected ? "icon-is-selected" : ""} uk-icon="star" />
    </a>
  );
};

export default StarIcon;
