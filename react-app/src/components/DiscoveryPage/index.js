import "./DiscoveryPage.css";

export default function DiscoveryPage() {
  return (
    <div className="guild-discovery">
      <div className="guild-left">
        <h2>Discover</h2>
        <div className="guild-left-categories">
          <div className="guild-left-cat">
            <div>
              <svg
                aria-hidden="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z"
                ></path>
              </svg>
            </div>
            <div>
              <p>Home</p>
            </div>
          </div>
        </div>
      </div>
      <div className="guild-right"></div>
    </div>
  );
}
