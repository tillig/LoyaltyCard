import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

/**
 * A single bar code entry on the form.
 * @return {JSX.Element} Bar code form container.
 */
export class BarCodeForm extends React.Component {
  /**
   * Render the form.
   * @param {Properties} props The properties for the form.
   * @return {React.ReactNode} The node to render.
   */
  render(): JSX.Element | null {
    const labelWidth = 4;
    return (
      <div className="mb-3">
        <Form.Group as={Row}>
          <Form.Label column sm={labelWidth}>
            Name
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="My Loyalty Card" />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={labelWidth}>
            Bar code type
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Put Dropdown Here" />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={labelWidth}>
            Number/Data
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="ABC-1234" />
          </Col>
        </Form.Group>
      </div>
    );
  }
}
