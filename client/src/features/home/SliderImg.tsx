interface Props {
  imgUrl: string;
  altString: string;
}

export default function SliderImg({ imgUrl, altString }: Props) {
  return (
    <div>
      <img
        src={imgUrl}
        alt={altString}
        style={{ maxHeight: 425 }}
      />
    </div>
  );
}