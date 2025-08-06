export default function Info({image, title}) {
  return (
    <div
      style={{
        position: "relative",
        height: "50px"
      }}
    >
      <img src={`/images/${image}`} alt="info-title" />
      <p
        style={{
          position: "absolute",
          top: "50%",
          translate: "130px -50%",
          color: "#8A4B4F",
        }}
      >
        {title}
      </p>
    </div>
  );
}
