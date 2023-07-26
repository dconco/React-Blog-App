const NotFound = () => {
  return <h1>404 | Page not Found</h1>;
};

const PageForbidden = () => {
  return <h1>403 | Forbidden</h1>;
};

const PageUnauthorized = () => {
  return <h1>501 | Unauthorized</h1>;
};

const PageExpired = () => {
  return <h1>419 | Page Expired</h1>;
};

export default NotFound;
export {
    PageForbidden,
    PageUnauthorized,
    PageExpired
};