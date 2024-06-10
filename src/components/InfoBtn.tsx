const InfoBtn = ({
  onClick
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button className="info-btn flex" onClick={onClick} aria-label="More info">
      <i className="icon-circle-info-solid" />
    </button>
  );
};

export default InfoBtn;
