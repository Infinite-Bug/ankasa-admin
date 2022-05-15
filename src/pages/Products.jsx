import React from "react";
import { Table, Button, Row, Col } from 'reactstrap';
import Swal from 'sweetalert2';
import style from '../assets/styles/utility';
import '../assets/styles/utility.css';

export default function Products() {
  return <div style={style.tableMargin}>
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
        <tr>
          <th scope="row">
            1
          </th>
          <td>
            Garuda Indonesia
          </td>
          <td>
            Indonesia
          </td>
          <td>
            Japan
          </td>
          <td>
            July 20th, 2020 - 12:33
          </td>
          <td>
            July 20th, 2020 - 20:33
          </td>
          <td>
            7900000
          </td>
          <td>
            55
          </td>
          <td className="text-center">
            <Row className="py-2">
              <Col>
                <Button color="warning" onClick={() => {  
                  Swal.fire({  
                    title: 'Detail of Product ID 1',    
                    html: '<p><b>Code:</b> AB-221</p>' + 
                    '<p><b>Gate:</b> 221</p>' + 
                    '<p><b>Terminal:</b> A</p>' + 
                    '<p><b>Class:</b> Economy</p>' + 
                    '<p><b>Transit:</b> 1 Transit</p>' +
                    '<p><b>Created Date:</b> July 13th, 2020</p>'
                  });  
                }}>Details</Button>
              </Col>
            </Row>
            <Row className="py-2">
              <Col>
                <Button color="primary" href='/edit-product/1'>Edit</Button>
              </Col>
            </Row>
            <Row className="py-2">
              <Col>
                <Button color="danger" onClick={() => {
                  Swal.fire({
                    title: 'Are you sure to delete this product?',
                    showCancelButton: true,
                    confirmButtonText: 'Delete'
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      Swal.fire('Successfully deleted!', '', 'success')
                    } else if (result.isDenied) {
                      Swal.fire('Product is not deleted', '', 'info')
                    }
                  })
                }}>Delete</Button>
              </Col>
            </Row>
          </td>
        </tr>
      </tbody>
    </Table>
    <div>
      <Row>
        <Col md={2}>
          <Button color="success" href='/add-product'>Add Products</Button>
        </Col>
      </Row>
    </div>
  </div>;
}
