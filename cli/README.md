# 🧩 UI Primitives Hub CLI

A CLI tool for generating UI components from your project on [UI Primitives Hub](https://your-url.dev).

---

## 📦 Installation

Install globally (recommended):

```bash
npm i -g @milancu/ui-primitives-hub
# or
pnpm dlx @milancu/ui-primitives-hub
```

---

## 🔐 Login

```bash
ui-primitives-hub login
```

Starts the authentication flow and stores your access token.

---

## ⚙️ Initialize Project

```bash
ui-primitives-hub init
```

Interactive setup will configure:

- Project ID
- Output directory for components (e.g., `src/components`)
- Package manager (`pnpm`, `npm`, `yarn`)

Optional flags:

```
-p, --project <id>         Set Project ID
-o, --output <path>        Output directory (default: src/components)
--package-manager <name>   Set package manager
-t, --token <token>        Provide token manually
```

---

## ➕ Add a Component

```bash
ui-primitives-hub add -c accordion
```

Generates the `accordion` component into your configured output directory.

Automatically handles:

- Fetching component code from the API
- Creating the `<Component>.tsx` file
- Creating a utility file (`src/lib/utils.ts`) if missing
- Installing required dependencies (if not installed):
    - `@base-ui-components/react`
    - `clsx`
    - `tailwind-merge`

Optional:

```
-f, --force    Overwrite existing file without prompt
```

---

## 🛠️ Config File

After initialization, config is saved at:

```
~/.ui-primitives-hub/config.json
```

Contains:

- `projectId`
- `outputDir`
- `token`
- `packageManager`

---

## 🧪 Quick Start

```bash
pnpm dlx @milancu/ui-primitives-hub login
pnpm dlx @milancu/ui-primitives-hub init -p <PROJECT_ID>
pnpm dlx @milancu/ui-primitives-hub add -c Accordion
```

---

## 🧑‍💻 Author

Built with ❤️ by [@milancu](https://github.com/milancu) 🚀

