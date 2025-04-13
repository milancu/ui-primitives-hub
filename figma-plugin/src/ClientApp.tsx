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
import {signInWithCustomToken} from "firebase/auth";
import {auth} from "./firebase";
import {useProjectStore} from "./project-store";
import {useAuthStore} from "./auth-store";
import dotenv from "dotenv";
import {useComponentStore} from "./component-store";
import chroma from 'chroma-js';
import Logo from "./Logo";

dotenv.config();

const components = [
  'accordion',
  'collapsible',
  'dialog',
  'field',
  'fieldset',
  'input',
  'menu',
  'numberfield',
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
  const [token, setToken] = React.useState<string | null>()
  const [error, setError] = React.useState<string | null>(null);
  const [projects, setProjects] = React.useState<any[]>([]);
  const projectId = useProjectStore((state) => state.projectId);
  const setProjectId = useProjectStore((state) => state.setProjectId);
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setParts = useComponentStore((state) => state.setParts);
  const setColors = useComponentStore((state) => state.setColors);


  const generateComponent = (componentName: string) => {
    if (!projectId || !accessToken || !componentName) return;
    fetch(`${process.env.BACKEND_API_URL}/projects/${projectId}/components/${componentName}/parts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(r => r.json()).then(data => {
          setParts(data)
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
            case "numberfield":
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
        }
    )
  };

  React.useEffect(() => {
    if (!currentUser) return;
    fetch(`${process.env.BACKEND_API_URL}/auth/figma/token?figmaId=${currentUser.id}`)
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

    signInWithCustomToken(auth, token)
      .then((r) => {
        setAccessToken((r.user as any).accessToken)
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        const errorMessage =
          error.code === "auth/invalid-custom-token"
            ? "Invalid token"
            : "Authentication failed";
        setError(errorMessage);
      });
  }, [token])

  React.useEffect(() => {
    if (!accessToken) return;
    fetch(`${process.env.BACKEND_API_URL}/projects`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(r => r.json()).then(data =>
      setProjects(data)
    )
  }, [accessToken])

  React.useEffect(() => {
    if (!projectId || !accessToken) return;
    fetch(`${process.env.BACKEND_API_URL}/projects/${projectId}/colors`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(r => r.json())
      .then(data => {
        const colors = data.light;
        const colorHexes: Record<string, string> = {};


        Object.keys(colors).forEach(key => {
          const colorValues = colors[key];
          if (colorValues.c !== undefined && colorValues.h !== undefined && colorValues.l !== undefined) {
            const color = chroma.oklch(colorValues.l, colorValues.c, colorValues.h);
            colorHexes[key] = color.hex();
          } else {
            console.log(`Invalid data for ${key}`);
          }
        });

        setColors(colorHexes);
      })
      .catch(error => console.error("Error:", error));
  }, [projectId, accessToken])

  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        <Logo/>
        <div>
          <label style={{
            marginBottom: 10,
            fontWeight: 500,
          }}>
            Please select a project:
            <div className={'select-wrapper'} style={{marginTop: 8}}>
              <select id={'project'} onChange={e => setProjectId(e.target.value)} defaultValue={""}>
                <option value="" disabled>Select your project</option>
                {projects.map(project => (
          <option key={project.id} value={project.id}>{project.name}</option>
        ))}
      </select>
            </div>
          </label>
      </div>
      {projectId && <div>
        Component:
        <div className={'component-list'}>
          {components.map(component => (
              <div className={'component-item'} key={component}>
                {component}
                <button onClick={() => generateComponent(component)}>generate</button>
              </div>
          ))}
        </div>
      </div>}
      <div className="container">
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};