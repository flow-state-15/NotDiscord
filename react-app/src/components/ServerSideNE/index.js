import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadUserServers } from "../../store/servers";
import "./ServerSideBarNE.css";

export default function ServerSideBarNE() {
  const dispatch = useDispatch();
  const servers = useSelector((state) => state.servers);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadUserServers(user?.id));
  }, []);

  const testFunc123 = (e) => {
    const rectangle = e.target.getBoundingClientRect();
    // console.log(e.target.classList);

    const testDiv = document.querySelector(".quicklildiv");
    const testDivText = document.querySelector(".quicklildivtext");
    // testDivText.innerHTML = e.target.classList[1]?.split("-").join(" ");
    testDivText.innerHTML =
      e.target.getAttribute("daAttribute") || "Loading...";

    testDiv.style.display = "block";
    testDiv.style.position = "absolute";
    testDiv.style.left = `${rectangle.left + 70}px`;
    testDiv.style.top = `${rectangle.top + 25}px`;
    return;
  };
  const testFunc1234 = () => {
    const testDiv = document.querySelector(".quicklildiv");
    testDiv.style.display = "none";
  };

  const allServers = Object.values(servers);

  const serversComponents = allServers.map((server) => {
    return (
      <li
        onMouseEnter={(e) => testFunc123(e)}
        onMouseLeave={(e) => testFunc1234(e)}
        daAttribute={server?.name}
        className={
          server?.icon?.length
            ? `main-server-servers ${server?.name.split(" ").join("-")}`
            : `main-server-servers ${server?.name
                .split(" ")
                .join("-")} purple-hover`
        }
        key={server?.id}
      >
        <Link
          daAttribute={server?.name}
          className={`link-alias-to-li ${server?.name.split(" ").join("-")}`}
          to={`/channels/${server?.id}`}
        >
          {server?.icon?.length ? (
            <img
              daAttribute={server?.name}
              className={`main-server-servers-icon ${server?.name
                .split(" ")
                .join("-")}`}
              alt="Server Icon"
              src={server?.icon}
            />
          ) : server?.name.includes(" ") ? (
            server?.name.split(" ").length >= 3 ? (
              <p className="server-servers-name-initial">
                {server?.name.split(" ")[0][0].toUpperCase()}
                {server?.name.split(" ")[1][0].toUpperCase()}
                {server?.name.split(" ")[2][0].toUpperCase()}
              </p>
            ) : (
              <p className="server-servers-name-initial">
                {server?.name.split(" ")[0][0].toUpperCase()}
                {server?.name.split(" ")[1][0].toUpperCase()}
              </p>
            )
          ) : (
            <p className="server-servers-name-initial">
              {server?.name.slice(0, 2).toUpperCase()}
            </p>
          )}
          <div className="main-server-servers-name">
            <h4 className="main-server-servers-name-text">{server?.name}</h4>
          </div>
        </Link>
      </li>
    );
  });

  return (
    <>
      <nav className="main-server-side-bar-container">
        <div className="quicklildiv">
          <p className="quicklildivtext">Server name</p>
        </div>
        <ul className="main-server-side-bar">
          <li
            className="main-server-servers Home purple-hover"
            onMouseEnter={(e) => testFunc123(e)}
            onMouseLeave={(e) => testFunc1234(e)}
          >
            <Link
              daAttribute={"Home"}
              className={"link-alias-to-li"}
              to={"/channels/@me"}
            >
              <svg
                class="homeIcon-AaowEC"
                aria-hidden="false"
                width="28"
                height="20"
                viewBox="0 0 28 20"
              >
                <path
                  fill="#fff"
                  d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z"
                ></path>
              </svg>
              <div className="main-server-servers-name">
                <h4 className="main-server-servers-name-text">Home</h4>
              </div>
            </Link>
          </li>
          <li className="main-server-divider"></li>
          {serversComponents}
          <li
            daAttribute={"Add Server"}
            className="main-server-servers Add-Server green-hover"
            onMouseEnter={(e) => testFunc123(e)}
            onMouseLeave={(e) => testFunc1234(e)}
          >
            <svg
              class="circleIcon-2_77lA"
              aria-hidden="false"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#3BA55D"
            >
              <path d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"></path>
            </svg>
            <div className="main-server-servers-name">
              <h4 className="main-server-servers-name-text">Add Server</h4>
            </div>
          </li>
          <li
            daAttribute={"Explore Public Servers"}
            className="main-server-servers Explore-Public-Servers green-hover"
            onMouseEnter={(e) => testFunc123(e)}
            onMouseLeave={(e) => testFunc1234(e)}
          >
            <svg
              aria-hidden="false"
              class="circleIcon-2_77lA"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#3BA55D"
            >
              <path d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z"></path>
            </svg>
            <div className="main-server-servers-name">
              <h4 className="main-server-servers-name-text">
                Explore Public Servers
              </h4>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
