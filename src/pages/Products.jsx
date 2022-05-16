import React, { useEffect } from "react";
import moment from "moment";
import Nav from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Table, Button, Row, Col } from "reactstrap";
import { getListProduct, deleteProduct } from "../redux/actions/product";
import Swal from "sweetalert2";
import style from "../assets/styles/utility";
import "../assets/styles/utility.css";
import Pagination from "../components/Pagination";

export default function Products() {
  const [queryParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => {
    return state.listProducts;
  });

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} | Product`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/product?`;

    if (queryParams.get('page')) {
      url += `&page=${queryParams.get('page')}`;
    }

    dispatch(getListProduct(url));
  }, [dispatch, queryParams])

  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure delete this airline?",
      icon: "warning",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
          .then((response) => {
            Swal.fire({
              title: response.message,
              icon: "success",
            });
            dispatch(getListProduct());
          })
          .catch((err) => {
            Swal.fire({
              title: "Delete failed!",
              icon: "error",
            });
          });
      }
    });
  };

  const applyFilter = (page = "") => {
    let url = "/product?";
    if (page) {
      url += `&page=${page}`;
    }
    return navigate(url);
  };

  return (
    <>
      <Nav />
      <div style={style.tableMargin}>
        <h1 className="text-center">Tickets</h1>
        <Table striped bordered>
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Airlines</th>
              <th>From</th>
              <th>To</th>
              <th>Flight Date</th>
              <th>Estimation</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.data.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.origin}</td>
                <td>{item.destination}</td>
                <td>{moment(item.flight_date).format("LLL")}</td>
                <td>{moment(item.estimation).format("LLL")}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td className="text-center">
                  <Row className="py-2">
                    <Col>
                      <Button
                        color="warning"
                        onClick={() => {
                          Swal.fire({
                            title: "Detail of Product ID 1",
                            html:
                              "<p><b>Code:</b> AB-221</p>" +
                              "<p><b>Gate:</b> 221</p>" +
                              "<p><b>Terminal:</b> A</p>" +
                              "<p><b>Class:</b> Economy</p>" +
                              "<p><b>Transit:</b> 1 Transit</p>" +
                              "<p><b>Created Date:</b> July 13th, 2020</p>",
                          });
                        }}
                      >
                        Details
                      </Button>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col>
                      <Button
                        color="primary"
                        onClick={() => navigate(`/edit-product/${item.id}`)}
                      >
                        Edit
                      </Button>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col>
                      <Button color="danger" onClick={() => onDelete(item.id)}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          {product.data.length && (
            <Pagination
              pagination={product.pagination}
              applyFilter={applyFilter}
            />
          )}
        </div>
        <div>
          <Row>
            <Col md={2}>
              <Button color="success" href="/add-product">
                Add Products
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      ;
    </>
  );
}
