# 📚 AI-Powered Learning Resource Backend

A Flask-based backend for uploading, parsing, enriching, and indexing PDFs and web links with AI summaries and semantic search, using pdfplumber, Jina Reader, OpenAI, AWS, and Algolia MCP Server.

# Features

1. User Management: Handles user registration/login and file management with AWS Cognito and S3.
2. PDF Upload & Parsing: Extracts text from uploaded PDFs using pdfplumber.
3. Web Link Content Extraction: Crawls and parses web pages/articles using Jina Reader.
4. AI Summarization: Uses OpenAI (GPT models) to generate concise summaries, key points, and practice questions (returned as JSON).
5. Semantic Search: Indexes assets and AI-enriched metadata to Algolia MCP Server for fast, smart search across all uploads.

# Tech Stack

| Component          | Library/Service    |
| ------------------ | ------------------ |
| Web Framework      | Flask              |
| PDF Parsing        | pdfplumber         |
| Web Extraction     | Jina Reader        |
| Summarization (AI) | OpenAI (GPT)       |
| User/Auth/Storage  | AWS RDS            |
| Search/Indexing    | Algolia MCP Server |

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/sakshi30/study-enhancement-bknd.git
cd study-enhancement-bknd
```

### 2. Install dependencies

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Configure environment variables

Create a `.env` file with:

```env
VITE_API_BASE_URL=https://<your-backend-url>
VITE_ALGOLIA_APP_ID=...
VITE_ALGOLIA_API_KEY=...
VITE_ALGOLIA_INDEX_NAME=...
```

### 4. Start the server

```bash
flask run
```

## Main Components

1. Login/Register: Auth screens connecting to backend/Cognito.
2. UploadArea: Upload PDFs/files (with drag-and-drop support).
3. LinkInput: Submit and validate web links for crawling.
4. UploadHistory: Status of recent uploads and processed content.
5. SearchBar: Central search with Algolia autocomplete.
6. ResultsList: Summaries, metadata, and download/preview for each result.
7. ResourceDetail: View full summary, key points, and practice questions.

## Requirements

- Node.js (v18+ recommended)
- Relevant Algolia account and index
- Access to backend API (Flask server)

## License

MIT

## Acknowledgments

- [React](https://react.dev)
- [Vite](https://vite.dev)
- [Algolia JavaScript API](https://www.algolia.com/doc/libraries/javascript/v5/)
- [Your backend and AI pipeline!]

---
