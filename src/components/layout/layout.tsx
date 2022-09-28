import { Navbar } from '../navbar/navbar';
import 'bootstrap/dist/css/bootstrap.css';

export const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className="d-flex justify-content-center align-items-center">
      <main>{children}</main>
    </div>
  </>
);
