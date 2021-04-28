import { Container, Row, Col } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>{children}</Col>
      </Row>
    </Container>
  );
};

export default Layout;
