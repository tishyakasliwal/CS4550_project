export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr> <br></br>
          <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assignment-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-assignment-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </td>
        </tr> <br></br>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade">Display Grade</label>
          </td>
          <td>
            <select id="wd-display-grade">
              <option value="percentage">Percentage</option>
              <option value="points">Points</option>
              <option value="letter">Letter Grade</option>
              <option value="gpa">GPA</option>
              <option value="pass_fail">Pass/Fail</option>
            </select>
          </td>
        </tr> <br></br>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="online">Online</option>
              <option value="paper">Paper</option>
              <option value="external_tool">External Tool</option>
            </select>
          </td>
        </tr>  <br></br>  
        <tr>
          <td align="right" valign="top">
            <label>Online Entry Options</label>
          </td>
          <td>
            <input type="checkbox" id="text-entry" name="online-entry" value="text-entry" />
            <label htmlFor="text-entry">Text Entry</label><br />
            <input type="checkbox" id="website-url" name="online-entry" value="website-url" />
            <label htmlFor="website-url">Website URL</label><br />
            <input type="checkbox" id="media-recordings" name="online-entry" value="media-recordings" />
            <label htmlFor="media-recordings">Media Recordings</label><br />
            <input type="checkbox" id="student-annotation" name="online-entry" value="student-annotation" />
            <label htmlFor="student-annotation">Student Annotation</label><br />
            <input type="checkbox" id="file-uploads" name="online-entry" value="file-uploads" />
            <label htmlFor="file-uploads">File Uploads</label>
          </td>
        </tr> <br></br>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign To</label>
          </td>
          <td>
            <input id="wd-assign-to" type="text" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due</label>
          </td>
          <td>
            <input id="wd-due-date" type="date" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-from">Available From</label>
          </td>
          <td>
            <input id="wd-available-from" type="date" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-until">Available Until</label>
          </td>
          <td>
            <input id="wd-available-until" type="date" />
          </td>
        </tr>
        </table>
        <div className="wd-buttons">
        <button>Cancel</button>
        <button>Save</button>
      </div>       
      </div>
  );}
  