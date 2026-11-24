function escape(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

module.exports = function guide({ studentName, studentNumber, projectName, apiBaseUrl }) {
  const base = escape(apiBaseUrl);
  const example = escape(JSON.stringify({
    title: 'Campus Wi-Fi connection issue',
    category: 'Network',
    description: 'A fictional student cannot connect a laptop to campus Wi-Fi in the library.',
    status: 'Pending',
  }, null, 2));
  const rows = [
    ['GET', '/', 'This API guide', '200 HTML'],
    ['GET', '/health', 'Server and database check', '200; 503 when the database is unavailable'],
    ['GET', '/api/records', 'Read all records in ID order', '200 array; [] when empty'],
    ['GET', '/api/records/:id', 'Read one record', '200 record'],
    ['POST', '/api/records', 'Create a record', '201 saved record with generated id'],
    ['PUT', '/api/records/:id', 'Replace all four fields', '200 updated record with original id'],
    ['DELETE', '/api/records/:id', 'Delete a record', '200 {"message":"Record deleted."}'],
  ].map(row => `<tr>${row.map(cell => `<td>${escape(cell)}</td>`).join('')}</tr>`).join('');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(projectName)} — ${escape(studentName)}</title>
<style>
body{margin:0;background:#f1f5f9;color:#17324d;font:16px/1.6 system-ui,sans-serif}
main{max-width:960px;margin:28px auto;padding:28px;background:white;border-radius:12px}
h1,h2{line-height:1.25}a{color:#1557a0}.table{overflow-x:auto}table{border-collapse:collapse;width:100%}
td,th{padding:10px;border:1px solid #d7e1ec;text-align:left;font-size:.93rem}th{background:#edf3fa}
pre{padding:18px;overflow:auto;color:#f1f5f9;background:#17324d;border-radius:6px}
@media(max-width:600px){main{margin:0;padding:18px;border-radius:0}}
</style></head><body><main>
<p>Mulungushi University · ICT251 · Activity 7</p>
<h1>${escape(projectName)} API</h1>
<p><strong>${escape(studentName)}</strong> · Student number: <strong>${escape(studentNumber)}</strong></p>
<p>An independent backend for storing and managing fictional campus IT support requests in SQLite.</p>
<p><strong>Base URL:</strong> <a href="${base}/">${base}</a></p>
<p><a href="${base}/health">Health check</a> · <a href="${base}/api/records">Read all records</a></p>
<h2>Routes</h2><div class="table"><table><thead><tr><th>Method</th><th>Route</th><th>Purpose</th><th>Response</th></tr></thead><tbody>${rows}</tbody></table></div>
<h2>Record fields</h2>
<p>Send all four editable fields as strings for POST and PUT. Surrounding spaces are trimmed. Set <code>Content-Type: application/json</code>.</p>
<ul><li><code>title</code>: 3–80 characters.</li><li><code>category</code>: 2–40 characters; free text.</li>
<li><code>description</code>: 5–300 characters.</li><li><code>status</code>: exactly <code>Pending</code>, <code>In progress</code>, or <code>Completed</code>.</li></ul>
<p>The database generates a positive whole-number <code>id</code>. Do not send it; supplied IDs are ignored. PUT keeps the original ID and does not create a missing record.</p>
<h2>Valid POST and PUT JSON</h2><pre><code>${example}</code></pre>
<p>POST to <code>/api/records</code>. Use the returned ID for GET, PUT and DELETE at <code>/api/records/:id</code>.</p>
<h2>Errors and testing</h2>
<p>All errors contain a JSON <code>message</code>. <strong>400</strong>: invalid input, invalid ID or malformed JSON; <strong>404</strong>: missing record or route; <strong>500</strong>: unexpected server failure; <strong>503</strong>: database unavailable during a health check or server still starting.</p>
<p>Use an API client for POST, PUT and DELETE. GET links work in a browser. An idle hosted service may need time to start; wait and retry the health check.</p>
</main></body></html>`;
};
