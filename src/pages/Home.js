import React, { useState } from "react";
import Startbar from "./components/Startbar";
import { Header, Segment, Form, Button } from "semantic-ui-react";

function Home() {
  const [values, setValues] = useState({
    e: "",
    z: "",
    f: "",
  });

  const [radius, setRadius] = useState(0);
  const [lambda, setLambda] = useState(0);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const calculateRadius = (event) => {
    event.preventDefault();
    const { e, z, f } = values;
    const A =
      (z / 60) * Math.sqrt((e + 1) / 2) +
      ((e - 1) / (e + 1)) * (0.23 + 0.11 / e);
    let wd = (8 * Math.exp(A)) / (Math.exp(2 * A) - 2);
    if (wd > 2) {
      const B = (377 * Math.PI) / (2 * z * Math.sqrt(e));
      wd =
        (2 / Math.PI) *
        (B -
          1 -
          Math.log(2 * B - 1) +
          ((e - 1) / (2 * e)) * (Math.log(B - 1) + 0.39 - 0.61 / e));
    }
    const Eeff =
      (e + 1) / 2 + ((e - 1) / 2) * (1 / Math.sqrt(1 + 12 * (1 / wd)));
    const lambda =
      (3 * Math.pow(10, 8)) / (f * Math.pow(10, 9) * Math.sqrt(Eeff));
    const ringRadius = lambda / (2 * Math.PI);
    setRadius(ringRadius);
    setLambda(lambda);
    console.log(wd);
  };

  return (
    <div>
      <Startbar />
      <Header as="h1">Ring Resonator Radius Calculator</Header>
      <div className="content leftAlign">
        <Segment>
          <Header as="h2" dividing>
            Enter the values to get the radius
          </Header>
          <Form>
            <Form.Field>
              <label>
                Permitivity( E<sub>r</sub> )
              </label>
              <input
                placeholder="Enter the εr value"
                type="number"
                onChange={handleChange}
                name="e"
                value={values.e}
              />
            </Form.Field>
            <Form.Field>
              <label>
                Z<sub>o</sub> value
              </label>
              <input
                placeholder="Enter the Zo value"
                type="number"
                onChange={handleChange}
                name="z"
                value={values.z}
              />
            </Form.Field>
            <Form.Field>
              <label>Frequency(f) in Ghz</label>
              <input
                placeholder="Enter the frequency value"
                type="number"
                onChange={handleChange}
                name="f"
                value={values.f}
              />
            </Form.Field>
            <Button primary onClick={calculateRadius}>
              Calculate
            </Button>
          </Form>
          <br />
          {radius !== 0 && (
            <div>
              <Header as="h4">Radius: {radius * 1000} mm</Header>
              <Header as="h4">Lambda g (λ<sub>g</sub>): {lambda * 1000} mm</Header>
              <Header as="h4">Length of block (L<sub>r</sub>): {lambda * 100} mm</Header>

            </div>
          )}
        </Segment>
      </div>
    </div>
  );
}

export default Home;
