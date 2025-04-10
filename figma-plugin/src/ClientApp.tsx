import * as React from 'react';
import {render} from "react-figma";
import {Accordion} from "./Accordion";
import {Collapsible} from "./Collapsible";
import {Dialog} from "./Dialog";
import {Field} from './Field';
import {Fieldset} from "./Fieldset";
import {Input} from "./Input";
import {Menu} from "./Menu";
import {NumberField} from "./NumberField";
import {Popover} from "./Popover";
import {Select} from './Select';

const components = [
  'accordion',
  'collapsible',
  'dialog',
  'field',
  'fieldset',
  'input',
  'menu',
  'number-field',
  'popover',
  'select'
]

interface ClientAppProps {
  currentUser?: {
    id: string,
    name: string,
  }
}

export const ClientApp = ({currentUser}: ClientAppProps) => {
  const [token, setToken] = React.useState<string | null>("eyJhbGciOiJSUzI1NiIsImtpZCI6IjMwYjIyMWFiNjU2MTdiY2Y4N2VlMGY4NDYyZjc0ZTM2NTIyY2EyZTQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUGh1b25nIERvbmcgQ3UiLCJwaWN0dXJlIjoiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8xMWY5NmNiYzk0YjlhYTQ1MDhmNDJlYTg2YTM0M2FhNj9zaXplPTI0MCZkZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMtYWxwaGEuZmlnbWEuY29tJTJGc3RhdGljJTJGdXNlcl9wX3YyLnBuZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9kYi1jb21wb25lbnRzLTU4ZjA2IiwiYXVkIjoiZGItY29tcG9uZW50cy01OGYwNiIsImF1dGhfdGltZSI6MTc0MzA4MTc1MCwidXNlcl9pZCI6ImZpZ21hOjEwNDE4MjgzNzUwMjEwMzMzMDQiLCJzdWIiOiJmaWdtYToxMDQxODI4Mzc1MDIxMDMzMzA0IiwiaWF0IjoxNzQzMDkwODY3LCJleHAiOjE3NDMwOTQ0NjcsImVtYWlsIjoicGh1b25nLmRvbmcuY3VAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInBodW9uZy5kb25nLmN1QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.oZCB-Zg3u_tuu9fUc4ixYSVyLIMbmxhoVruTALDf-ZWE-DLAsen5piiwx1GYwZxKiCTsaWH4Y9H6fCuXHlWXW5w2-z3XxtwzQi65X90a4uIUzGGcvGEj51hOfkBcb6zn_JF397ck9GligaoU-MozEKnt0AyYgXZ14zuz4_8IR5__tFdVp3Qyr9-EVRw47woPw3DQA36Knva41xl-2rGSll7V56BKV_3HIBlkHWg7aRETI78ptSsVTWL8iozVeh8JT9YPUso_nOb34LYq-P8sxzdl75AvmwRb7a13pTDAOT-x4hTecIXVofWOe9n0jNcY7VYEir_fLfCXlNFU7YXzeA")
  const [authInProgress, setAuthInProgress] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  // const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxMTE1MjM1YTZjNjE0NTRlZmRlZGM0NWE3N2U0MzUxMzY3ZWViZTAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUGh1b25nIERvbmcgQ3UiLCJwaWN0dXJlIjoiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8xMWY5NmNiYzk0YjlhYTQ1MDhmNDJlYTg2YTM0M2FhNj9zaXplPTI0MCZkZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMtYWxwaGEuZmlnbWEuY29tJTJGc3RhdGljJTJGdXNlcl9wX3YyLnBuZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9kYi1jb21wb25lbnRzLTU4ZjA2IiwiYXVkIjoiZGItY29tcG9uZW50cy01OGYwNiIsImF1dGhfdGltZSI6MTc0MzY4NjkwNywidXNlcl9pZCI6ImZpZ21hOjEwNDE4MjgzNzUwMjEwMzMzMDQiLCJzdWIiOiJmaWdtYToxMDQxODI4Mzc1MDIxMDMzMzA0IiwiaWF0IjoxNzQ0MzE3MDU1LCJleHAiOjE3NDQzMjA2NTUsImVtYWlsIjoicGh1b25nLmRvbmcuY3VAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInBodW9uZy5kb25nLmN1QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.RIl0GaBHK9t4KNPfvxYm5-rosaQDbYRhgLDvMs8VIygxSeCOJX3Qspa1ZJE2uquCxfKI_-qyNAfl5U3TzYK-1HB0WTmtrF21eG-2a5Ie3hEwdvANj-rv56VZnCWDztB3t-Kuthg4cpGtq4QJ-2lx9xzbHaHLUz11by-Bqjrb4u3q9ZASJUxFaILavkvxoRf9gM7jssTrf0XPzruqQcf4t4COQQVOvOIRcnA4AuwQPqzAEOdDMEN2suRr-A2CJZWXSkloTlZ7Q2US_GZnl9GjbwW4upbZ80cVeS1GNbo1TLMiMd7yYjiPFV0-9JoFJvgIdPKscSnHN8FWEhvS33dWJg'

  const generateComponent = (componentName: string) => {
    switch (componentName) {
      case "accordion":
        return render(
          <Accordion/>
        );
      case "collapsible":
        return render(
          <Collapsible/>
        );
      case "dialog":
        return render(
          <Dialog/>
        )
      case "field":
        return render(
          <Field/>
        )
      case "fieldset":
        return render(
          <Fieldset/>
        )
      case "input":
        return render(
          <Input/>
        )
      case "menu":
        return render(
          <Menu/>
        )
      case "number-field":
        return render(
          <NumberField/>
        )
      case "popover":
        return render(
          <Popover/>
        )
      case "select":
        return render(
          <Select/>
        )
    }
  };

  React.useEffect(() => {
    if (!currentUser) return;
    fetch(`https://ui-primitives-hub-be.onrender.com/auth/figma/token?figmaId=${currentUser.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setToken(data))
      .catch(error => {
        setError(error.message);
        console.error('Chyba:', error);
      })


  }, [currentUser])


  React.useEffect(() => {
    if (!token) return;

    fetch('https://ui-primitives-hub-be.onrender.com/projects', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(r => r.json()).then(data =>
      console.log(data)
    )
  }, [token])

  return (
    <div>
      <div>
        {components.map(component => (
          <button key={component} onClick={() => generateComponent(component)}>{component}</button>
        ))}
      </div>
      <div className="container">
        <h1>Connect to Service</h1>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};