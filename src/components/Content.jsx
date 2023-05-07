export default function Content({ isSidebarFolded }) {
  return (
    <div
      style={{
        display: "flex",
        padding: "32px",
        flex: "1",
        backgroundColor: "beige",
        flexDirection: "column",
        margin: "0 auto",
        maxWidth: "875px",
      }}
    >
      <div>
        <div
          className="dashboard-name-section"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            borderBottom: "1px solid black",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "4px",
              backgroundColor: "#cd5a91",
              textAlign: "center",
              lineHeight: "60px",
              fontWeight: "bold",
              fontSize: "30px",
              color: "white",
              marginRight: "20px",
            }}
          >
            Y
          </div>
          <div
            style={{
              height: "60px",
              width: "100px",
              lineHeight: "60px",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            yooni
          </div>
        </div>
      </div>
    </div>
  );
}
