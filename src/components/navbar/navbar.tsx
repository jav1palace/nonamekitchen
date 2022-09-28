export const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">
      NoName Kitchen
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-item nav-link" href="/input">
          New Expense
        </a>
        <a className="nav-item nav-link" href="/auth/logout">
          Logout
        </a>
        <a className="nav-item nav-link disabled" href="#">
          View Report
        </a>
      </div>
    </div>
  </nav>
);
