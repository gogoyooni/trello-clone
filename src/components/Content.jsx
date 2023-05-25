import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";

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
        <div
          className="boards-section"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            className="select-menu"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label for="sort-by" style={{ marginBottom: "5px" }}>
              Sort by
            </label>
            <select name="sort-by" id="sort-by">
              <option value="mostRecentlyActive">Most Recently Active</option>
              <option value="leastRecentlyActive">Least Recently Active</option>
              <option value="alphabeticallyAtoZ">Alphabetically A-Z</option>
              <option value="alphabeticallyZtoA">Alphabetically Z-A</option>
            </select>
          </div>
          <div
            className="search"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {/* search boards input */}
            <label for="search" style={{ marginBottom: "5px" }}>
              Search
            </label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search boards"
            />
          </div>
        </div>
        <div className="boards-list" style={{ marginTop: "20px" }}>
          <div className="boards-count" style={{ marginBottom: "20px" }}>
            <p>Showing 2 of 2 boards</p>
          </div>
          <ul
            style={{
              display: "flex",
              // gap: "10px",
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            <li
              style={{
                width: "33.3%",
                height: "80px",
                cursor: "pointer",
                backgroundColor: "grey",
                textAlign: "center",
                lineHeight: "80px",
                borderRadius: "5px",
                padding: "4px 8px",
              }}
            >
              Create new board
            </li>
            <li
              style={{
                width: "33.3%",
                height: "80px",
                cursor: "pointer",
                height: "80px",
                cursor: "pointer",
                backgroundColor: "aliceblue",
                // textAlign: "center",
                // lineHeight: "80px",
                borderRadius: "5px",
                padding: "4px 8px",
                display: "inline-block",
              }}
            >
              <Link to={"/b/1"}>
                <div
                  clasName="board-item-inner"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "80px",
                  }}
                >
                  <div
                    style={{
                      wordWrap: "break-word",
                      fontWeight: "700",
                      overflow: "hidden",
                    }}
                  >
                    트렐로 보드 1
                  </div>
                  <div
                    className="board-favorite"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      zIndex: "2",
                    }}
                  >
                    <FiStar
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    />
                  </div>
                </div>
              </Link>
            </li>
            <li
              style={{
                width: "33.3%",
                height: "80px",
                cursor: "pointer",
                height: "80px",
                cursor: "pointer",
                backgroundColor: "bisque",
                // textAlign: "center",
                // lineHeight: "80px",
                borderRadius: "5px",
                padding: "4px 8px",
              }}
            >
              <Link to={"/b/2"}>
                <div
                  clasName="board-item-inner"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "80px",
                  }}
                >
                  <div
                    style={{
                      wordWrap: "break-word",
                      fontWeight: "700",
                      overflow: "hidden",
                    }}
                  >
                    트렐로 보드 2
                  </div>
                  <div
                    className="board-favorite"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <FiStar
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    />
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
