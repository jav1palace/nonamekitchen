interface ThumbnailProps {
  file: string;
}

export const Thumbnail = ({ file }: ThumbnailProps) => {
  const handleOnChange = (event) => {
    file = URL.createObjectURL(event.target.files[0]);
  };
  return (
    <div>
      <input type="file" onChange={handleOnChange} />
      <img src={file} />
    </div>
  );
};
