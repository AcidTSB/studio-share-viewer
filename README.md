# Studio Share Viewer

Next.js web application for viewing shared audio content from Studio App.

## Features

- 🎵 **Audio Playback**: Stream audio directly from cloud storage
- 🔒 **Password Protection**: Secure shared content with passwords
- ⏰ **Expiration Support**: Automatic link expiration
- 📱 **Responsive Design**: Works on desktop and mobile
- 🎨 **Modern UI**: Clean, accessible interface

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Database & Storage
- **bcryptjs** - Password hashing

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Supabase account

### Installation

```bash
pnpm install
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
pnpm build
pnpm start
```

## Deployment

See [SHARE_SETUP.md](../docs/SHARE_SETUP.md) for full deployment guide.
