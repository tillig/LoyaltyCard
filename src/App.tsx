import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import './App.css';
import { Card } from './Card';

// TODO: Switch barcode generation to https://www.npmjs.com/package/jsbarcode
// TODO: Update history as data is changed.
// TODO: Code forms don't want to be full width. Why not?
// TODO: Get PDF rendering using http://mozilla.github.io/pdf.js/

/**
 * Main application component.
 * @return {JSX.Element} Main application container.
 */
export class App extends React.Component {
  /**
   * Render the form.
   * @param {Properties} props The properties for the application.
   * @return {React.ReactNode} The node to render.
   */
  render(): JSX.Element | null {
    const cards: Card[] = [];

    for (let index = 0; index < 8; index++) {
      const card = {
        id: index,
      } as Card;
      cards.push(card);
    }
    const labelWidth = 4;

    return (
      <div>
        <header>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Loyalty Card</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="https://github.com/tillig/LoyaltyCard">Source on GitHub</Nav.Link>
                <Nav.Link href="https://www.paraesthesia.com">My Blog</Nav.Link>
                <Nav.Link href="http://app.paraesthesia.com">Other Apps</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
        <main role="main">
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <div className="page-header">
                  <h1>LoyaltyCard <small className="text-muted">Generate a combined loyalty/club card</small></h1>
                </div>
                <p><strong>Ready to save some wallet space?</strong></p>
                <p><strong>Use the form below to enter up to eight (8) bar codes for your loyalty cards.</strong> As you save the data, you can preview the output to double-check that the barcode type and format is as expected. It&apos;s important to compare this to the real barcode or it won&apos;t work when it&apos;s scanned later.</p>
                <p><strong>When finished...</strong></p>
                <ul>
                  <li><strong>Use the &quot;download&quot; button to get the rendered combined card as a PDF for printing.</strong> You&apos;ll have a single card with up to four bar codes on each side, suitable for lamination.</li>
                  <li><strong>&quot;Save&quot; your data by bookmarking the page.</strong> When you return, you can re-print your card or edit/update.</li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Form>
                {cards.map((card) => (
                  <div className="mb-3" key={card.id}>
                    <Form.Group as={Row}>
                      <Form.Label column sm={labelWidth} htmlFor={'name-' + card.id}>
                        Name
                      </Form.Label>
                      <Col>
                        <Form.Control type="text" placeholder="My Loyalty Card" id={'name-' + card.id} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm={labelWidth} htmlFor={'type-' + card.id}>
                        Bar code type
                      </Form.Label>
                      <Col>
                        <Form.Control type="text" placeholder="Put Dropdown Here" id={'type-' + card.id} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm={labelWidth} id={'data-' + card.id}>
                        Number/Data
                      </Form.Label>
                      <Col>
                        <Form.Control type="text" placeholder="ABC-1234" id={'data-' + card.id} />
                      </Col>
                    </Form.Group>
                  </div>
                ))}
                <Button variant="primary">
                  Download PDF
                </Button>
              </Form>
            </Row>
          </Container>
        </main>
        <footer className="text-muted">
          <Container>
            <div className="social-button">
              <div className="fb-like" data-href="https://www.paraesthesia.com/LoyaltyCard/" data-send="true" data-width="450" data-show-faces="true"></div>
            </div>
            <p className="disclaimer">LoyaltyCard generator created by <a href="https://www.paraesthesia.com">Travis Illig</a>. Phone-based loyalty card applications have gotten better, but sometimes you just need that piece of paper.</p>
            <p className="disclaimer"><a href="https://www.tec-it.com/" target="_blank" rel="noreferrer">Bar codes generated with TEC-IT Barcode Software.</a></p>

            <ins className="adsbygoogle"
              style={{ display: 'inline-block', width: '468px', height: '60px' }}
              data-ad-client="ca-pub-9058541546510381"
              data-ad-slot="6917069027"></ins>
          </Container>
        </footer>
      </div>
    );
  }
}
