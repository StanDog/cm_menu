var is_firefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

// Automatic URI hash unescaping bug was finally fixed in Firefox 41. Test!
// https://bugzilla.mozilla.org/show_bug.cgi?id=1093611
var is_firefox41 = true;
if (is_firefox)
{
	var firefoxVer = navigator.userAgent.toLowerCase();
	firefoxVer = firefoxVer.substr(firefoxVer.indexOf('firefox/') + ('firefox/').length);
	firefoxVer = firefoxVer.substr(0, firefoxVer.indexOf('.'));

	if
	(
		(/^[0-9]{2,}$/.test(firefoxVer)) &&
		(parseInt(firefoxVer) < 41)
	)
	{
		is_firefox41 = false;
	}
}

var headerSearchFocused = true;
var menuTypesOpened = false;
var leftMenuOpened = true;
var relatedPages = [];
var startPage = "Introduction";
var currentPage = startPage;
var pageData = "eyJmaWxlTGlzdCI6W3siZmlsZSI6IkludHJvZHVjdGlvbiIsImluZGV4VGl0bGUiOiJJbnRyb2R1Y3Rpb24iLCJ0b3BpY1RpdGxlIjoiSW50cm9kdWN0aW9uIn0seyJmaWxlIjoiRXhhbXBsZXMiLCJpbmRleFRpdGxlIjoiRXhhbXBsZXMiLCJ0b3BpY1RpdGxlIjoiRXhhbXBsZXMifSx7ImZpbGUiOiJDdXN0b21fZXZlbnRzIiwiaW5kZXhUaXRsZSI6IkN1c3RvbSBldmVudHMiLCJ0b3BpY1RpdGxlIjoiQ3VzdG9tIGV2ZW50cyJ9LHsiZmlsZSI6IkNoYW5nZV9sb2ciLCJpbmRleFRpdGxlIjoiQ2hhbmdlIGxvZyIsInRvcGljVGl0bGUiOiJDaGFuZ2UgbG9nIn0seyJmaWxlIjoidmVyc2lvbiIsImluZGV4VGl0bGUiOiJ2ZXJzaW9uIiwidG9waWNUaXRsZSI6InZlcnNpb24ifSx7ImZpbGUiOiJpbml0aWFsaXplZCIsImluZGV4VGl0bGUiOiJpbml0aWFsaXplZCIsInRvcGljVGl0bGUiOiJpbml0aWFsaXplZCJ9LHsiZmlsZSI6InVuaXF1ZU1lbnVJRCIsImluZGV4VGl0bGUiOiJ1bmlxdWVNZW51SUQiLCJ0b3BpY1RpdGxlIjoidW5pcXVlTWVudUlEIn0seyJmaWxlIjoiY29udGV4dEVsZW1lbnQiLCJpbmRleFRpdGxlIjoiY29udGV4dEVsZW1lbnQiLCJ0b3BpY1RpdGxlIjoiY29udGV4dEVsZW1lbnQifSx7ImZpbGUiOiJpbml0IiwiaW5kZXhUaXRsZSI6ImluaXQiLCJ0b3BpY1RpdGxlIjoiaW5pdCJ9LHsiZmlsZSI6ImNyZWF0ZU1lbnUiLCJpbmRleFRpdGxlIjoiY3JlYXRlTWVudSIsInRvcGljVGl0bGUiOiJjcmVhdGVNZW51In0seyJmaWxlIjoiYXNzaWduTWVudSIsImluZGV4VGl0bGUiOiJhc3NpZ25NZW51IiwidG9waWNUaXRsZSI6ImFzc2lnbk1lbnUifSx7ImZpbGUiOiJfc2hvd01lbnUiLCJpbmRleFRpdGxlIjoiX3Nob3dNZW51IiwidG9waWNUaXRsZSI6Il9zaG93TWVudSJ9LHsiZmlsZSI6Il9zaG93U3ViTWVudSIsImluZGV4VGl0bGUiOiJfc2hvd1N1Yk1lbnUiLCJ0b3BpY1RpdGxlIjoiX3Nob3dTdWJNZW51In0seyJmaWxlIjoiX2Nsb3NlTWVudXMiLCJpbmRleFRpdGxlIjoiX2Nsb3NlTWVudXMiLCJ0b3BpY1RpdGxlIjoiX2Nsb3NlTWVudXMifV0sInRvcGljc0xpc3QiOlswLDEsMiwzLHsiY2F0ZWdvcnkiOjAsInBhcmVudENhdGVnb3J5IjpudWxsLCJzdWJpdGVtcyI6WzQsNSw2LDddfSx7ImNhdGVnb3J5IjoxLCJwYXJlbnRDYXRlZ29yeSI6bnVsbCwic3ViaXRlbXMiOls4LDksMTAsMTEsMTIsMTNdfV0sInNlYXJjaCI6eyJjbSI6WzAsMSwyLDQsNSw2LDgsOSwxMCwxMSwxMl0sIm1lbnUiOlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyXSwiaXMiOlswLDEsMiw1LDYsNyw4LDksMTAsMTEsMTIsMTNdLCJhbiI6WzAsMSwyLDksMTAsMTFdLCJhbHRlcm5hdGl2ZSI6WzAsMSw5XSwiY3VzdG9tIjpbMCwyLDExLDEyXSwiY29udGV4dCI6WzAsMiwzLDcsOSwxMCwxMV0sInJlcGxhY2VtZW50IjpbMF0sImZvciI6WzAsMSwyLDQsNiw5XSwidGhlIjpbMCwxLDIsMyw2LDcsOCw5LDEwLDExLDEyLDEzXSwiYnJvd3NlciI6WzAsOSwxMSwxMl0sInMiOlswLDEsOSwxMF0sImRlZmF1bHQiOlswLDMsNCw1LDYsNyw5XSwiaXQiOlswLDEsMiw3LDgsOSwxMCwxMV0sInN1cHBvcnRzIjpbMF0sIm11bHRpcGxlIjpbMCwxXSwibWVudXMiOlswLDEsMyw2LDgsOSwxM10sIndpdGgiOlswLDEsMiwzLDgsOSwxMF0sInN0eWxpbmciOlswXSwiYW5kIjpbMCwxLDIsOCw5LDEwLDExLDEzXSwic3ViIjpbMCwxLDgsOSwxMiwxM10sImljb25zIjpbMCw5XSwiZGVsaW1pdGVycyI6WzBdLCJhY3RpdmUiOlswXSwic3RhdGVzIjpbMF0sImJhc2VkIjpbMF0sIm9uIjpbMCwyLDMsOSwxMF0sImEiOlswLDEsMiwzLDYsNyw4LDksMTAsMTEsMTJdLCJzbWFsbCI6WzAsOV0sInNpbmdsZSI6WzBdLCJqYXZhc2NpcHQiOlswXSwiY2xhc3MiOlswLDhdLCJ3aGljaCI6WzAsMSwyLDcsOSwxMF0sImNvbnRhaW5zIjpbMCw5XSwiYWxsIjpbMCwxLDgsOSwxM10sImZ1bmN0aW9uYWxpdHkiOlswLDldLCJkb2VzIjpbMCwzLDEyXSwibm90IjpbMCwxLDMsOSwxMSwxMl0sInBvbGx1dGUiOlswXSwicmVzdCI6WzBdLCJvZiI6WzAsMSwyLDQsNyw4LDksMTAsMTEsMTJdLCJjb2RlIjpbMF0sImluIjpbMCwyLDcsOCw5LDExLDEzXSwid29ya3MiOlswXSwiY3VycmVudCI6WzBdLCJtYWpvciI6WzBdLCJicm93c2VycyI6WzBdLCJsaWtlIjpbMCw5XSwiY2hyb21lIjpbMF0sImZpcmVmb3giOlswXSwib3BlcmEiOlswXSwiaW50ZXJuZXQiOlswXSwiZXhwbG9yZXIiOlswXSwiXC8iOlswLDksMTBdLCJlZGdlIjpbMF0sInNhZmFyaSI6WzBdLCJvcGVuIjpbMCwxLDcsOV0sInNvdWNlIjpbMF0sImxpY2Vuc2VkIjpbMF0sInVuZGVyIjpbMF0sInZlcnkiOlswLDldLCJwZXJtaXNzaXZlIjpbMF0sIm1pdCI6WzBdLCJsaWNlbnNlIjpbMCwzXSwid3JpdHRlbiI6WzBdLCJieSI6WzAsMSwyLDYsOSwxMCwxMSwxMl0sInN0YW5pc2xhdiI6WzBdLCJlY2tlcnQiOlswXSwiZ2l0aHViIjpbMCwzXSwiaHR0cHMiOlswLDJdLCJcL1wvZ2l0aHViIjpbMF0sImNvbVwvc3RhbmRvZ1wvY21fbWVudSI6WzBdLCJlbWFpbCI6WzBdLCJnaXRodWJAc3RhbmlzbGF2ZWNrZXJ0IjpbMF0sImNvbSI6WzBdLCJ3ZWIiOlswXSwiaHR0cCI6WzBdLCJcL1wvc3RhbmlzbGF2ZWNrZXJ0IjpbMF0sImV4YW1wbGVzIjpbMSwzXSwiZXhhbXBsZSI6WzEsMiw5XSwiIzEiOlsxXSwiY3JlYXRlIjpbMSwyLDYsOSwxMF0sInR3byI6WzEsMiw5XSwiZW50cmllcyI6WzEsMiw5XSwib25lIjpbMSw4XSwidGhlbSI6WzFdLCJkZWFjdGl2YXRlZCI6WzFdLCJhcmUiOlsxLDIsMyw4LDldLCJzZXBhcmF0ZWQiOlsxXSwiZGVsaW1pdGVyIjpbMSw5XSwic3RvcmUiOlsxXSwidG8iOlsxLDIsMyw1LDYsNyw4LDksMTAsMTFdLCJ2YXJpYWJsZSI6WzEsOV0sInZhciI6WzEsMiw5XSwibXlzdWJtZW51IjpbMSw5XSwiPSI6WzEsMiw5XSwiY21fbWVudSI6WzEsMiw4LDldLCJjcmVhdGVtZW51IjpbMSwyLDYsOSwxMF0sImljb25iYXIiOlsxLDldLCJ0cnVlIjpbMSw1LDgsOV0sImlkIjpbMSwyLDMsNiw5LDEwXSwic3ViaXRlbTEiOlsxXSwiY2FwdGlvbiI6WzEsMiw5XSwiY2xpY2siOlsxLDIsMyw3LDldLCJtZSI6WzFdLCJpY29uIjpbMSw5XSwiaWNvbjEiOlsxXSwicG5nIjpbMSw5XSwiYWxlcnQiOlsxLDldLCJoZWxsbyI6WzFdLCJ3b3JsZCI6WzFdLCJkaXNhYmxlZCI6WzEsMiw5XSwiaXRlbSI6WzEsMyw5XSwiaWNvbjIiOlsxXSwiIzIiOlsxXSwiYXNzaWduIjpbMSwyLDksMTBdLCJodG1sIjpbMSwyLDcsOSwxMCwxMV0sImVsZW1lbnQiOlsxLDIsMyw3LDksMTAsMTEsMTJdLCJteWRpdiI6WzFdLCJlbnRyeSI6WzEsMiw3LDldLCJteW1lbnUiOlsxLDldLCJzdWJtZW51IjpbMSw5XSwiIzMiOlsxXSwiZWxlbWVudHMiOlsxXSwiZnJvbSI6WzFdLCJhYm92ZSI6WzEsOV0sImFzc2lnbm1lbnUiOlsxLDIsOSwxMF0sIm15ZGl2MiI6WzFdLCJteWRpdjMiOlsxXSwiXC9cLyI6WzEsMiw5XSwiIzQiOlsxXSwiZnVuY3Rpb24iOlsxLDIsMyw5XSwicmVmZXJlbmNlIjpbMSw3LDksMTAsMTJdLCJkaXJlY3RseSI6WzEsOV0sImV2ZW50IjpbMSwyLDcsOSwxMCwxMSwxMl0sInJpZ2h0IjpbMSwyLDcsOSwxMV0sImNsaWNrZWQiOlsxLDIsNyw4LDksMTFdLCJ0ZXh0IjpbMSwyLDldLCJjb250ZW50IjpbMSwyLDMsOV0sIm15ZnVuYyI6WzEsOV0sImltcG9ydGFudCI6WzFdLCJ3aGVuIjpbMSwyLDYsNyw4LDksMTEsMTIsMTNdLCJhc3NpZ25pbmciOlsxLDldLCJmdW5jdGlvbnMiOlsxXSwiaW5zdGVhZCI6WzFdLCJzdHJpbmciOlsxLDMsOSwxMF0sInRoaXMiOlsxLDUsNyw4LDksMTAsMTEsMTIsMTNdLCJtdXN0IjpbMSwyXSwiYmUiOlsxLDIsMyw0LDcsOV0sImNhbGxlZCI6WzEsOCwxMSwxM10sImNsb3NlIjpbMSw4LDldLCJfY2xvc2VtZW51cyI6WzEsOSwxM10sImNvbnRleHRlbGVtZW50IjpbMSwyLDcsOV0sInRleHRjb250ZW50IjpbMSwyLDldLCJub3RlIjpbMSw5LDEyXSwiaWYiOlsxLDIsNiw4LDksMTAsMTEsMTNdLCJuZWNlc3NhcnkiOlsxLDldLCJjYWxsIjpbMSw5LDExLDEyXSwiYmVjYXVzZSI6WzFdLCJtZXRob2QiOlsxLDIsOCw5LDEwLDExLDEyLDEzXSwid2lsbCI6WzEsMiw5LDEwLDExXSwiYXV0b21hdGljYWxseSI6WzEsMyw1LDYsOSwxMSwxMiwxM10sIiM1IjpbMV0sIm1vZGlmeSI6WzEsMiw3XSwiYmVmb3JlIjpbMSwyLDcsOSwxMl0sImRpc3BsYXlpbmciOlsxXSwiJmx0IjpbMSwyXSwiZG9jdHlwZSI6WzFdLCJodG1sJmd0IjpbMV0sImhlYWQmZ3QiOlsxXSwic2NyaXB0IjpbMV0sInNyYz0iOlsxXSwiY21fbWVudVwvY21fbWVudSI6WzFdLCJqcyI6WzFdLCImZ3QiOlsxLDJdLCJcL3NjcmlwdCZndCI6WzFdLCJzY3JpcHQmZ3QiOlsxXSwid2luZG93IjpbMV0sImFkZGV2ZW50bGlzdGVuZXIiOlsxXSwibG9hZCI6WzFdLCJldnQiOlsxXSwiZW50cnkxIjpbMV0sIjEiOlsxLDMsNl0sImVudHJ5MiI6WzFdLCIyIjpbMSwzXSwibXlzcGFuIjpbMV0sIm1vZGlmeW1lbnUiOlsxLDJdLCJjb2xvcml6ZSI6WzEsOV0sInJlZCI6WzEsOV0sImRpdiI6WzFdLCJvdGhlcndpc2UiOlsxXSwiYmx1ZSI6WzFdLCJ0YWduYW1lIjpbMV0sIj09IjpbMV0sImRvY3VtZW50IjpbMSwyLDgsMTAsMTNdLCJnZXRlbGVtZW50YnlpZCI6WzEsMiwxMF0sInN0eWxlIjpbMSw5XSwiY29sb3IiOlsxLDldLCJlbHNlIjpbMSwyLDgsMTNdLCJcL2hlYWQmZ3QiOlsxXSwiYm9keSZndCI6WzFdLCJpZD0iOlsxLDJdLCJkYXRhIjpbMSwyLDksMTAsMTJdLCJvbmJlZm9yZW9wZW49IjpbMSwyXSwibWUmbHQiOlsxXSwiXC9kaXYmZ3QiOlsxXSwic3BhbiI6WzFdLCJcL3NwYW4mZ3QiOlsxXSwiXC9ib2R5Jmd0IjpbMV0sIlwvaHRtbCZndCI6WzFdLCJwcmV2ZW50IjpbMV0sImFjdHVhbGx5IjpbMV0sImp1c3QiOlsxXSwiaGlkZXMiOlsxXSwiYWZ0ZXIiOlsxLDIsNV0sInNob3duIjpbMSwyLDldLCJjaGVja21lbnV0b2Rpc3BsYXkiOlsxXSwiZSI6WzEsMl0sImRvIjpbMSwyLDExLDEyXSwibm93IjpbMSwzXSwic2hvdyI6WzFdLCJoaWRlIjpbMSwyXSwidGFnIjpbMV0sImFjY2Vzc2luZyI6WzFdLCJoYXJkZXIiOlsxXSwiYnV0IjpbMSwyXSwiYWxsb3dzIjpbMSwyXSwibW9yZSI6WzFdLCJjb250cm9sIjpbMV0sInBvc3NpYmUiOlsxXSwidXNlIjpbMSwzLDldLCJiZWxvdyI6WzEsOV0sImdldGF0dHJpYnV0ZSI6WzEsMl0sImRpc3BsYXkiOlsxLDldLCJub25lIjpbMV0sIm9yIjpbMSwyLDcsOCw5LDEyLDEzXSwiYWx0ZXJuYXRpdmVseSI6WzEsOV0sIm9ub3Blbj0iOlsxXSwiZXZlbnRzIjpbMiw4LDExLDEyXSwibW9kaWZ5aW5nIjpbMiw5XSwiaW1hZ2luZSI6WzJdLCJ5b3UiOlsyLDldLCJ3YW50IjpbMiw5XSwic29tZXRoaW5nIjpbMl0sInNvbWUiOlsyXSwic3BlY2lmaWMiOlsyLDddLCJkZXBlbmRpbmciOlsyLDNdLCJjb3VsZCI6WzJdLCJzZXBhcmV0ZSI6WzJdLCJlYXNpZXIiOlsyXSwiZmFzdGVyIjpbMl0sIm9ubHkiOlsyLDMsOCw5XSwiaW1wbGVtZW50cyI6WzJdLCJzcGVjaWFsIjpbMl0sInRyaWdnZXJlZCI6WzJdLCJkaXNwbGF5ZWQiOlsyLDcsOV0sIm9uYmVmb3Jlb3BlbiI6WzIsMTJdLCJvbm9wZW4iOlsyLDEyXSwib3B0aW9uYWwiOlsyLDldLCJoYXMiOlsyLDYsNyw4LDksMTAsMTNdLCJhZGRlZCI6WzIsM10sImFzIjpbMiw5LDEwLDEyXSwiZG9tIjpbMiw2LDksMTBdLCJhdHRyaWJ1dGUiOlsyLDMsNSw2LDcsOCw5LDEwXSwid2hvbSI6WzJdLCJhc3NpZ25lZCI6WzIsNyw5LDEwLDExXSwiaHJlZj0iOlsyXSwiXC9cL2V4YW1wbGUiOlsyXSwiY29tXC8iOlsyXSwibGluazIiOlsyXSwibXkiOlsyXSwibGluayZsdCI6WzJdLCJcL2EmZ3QiOlsyXSwiaW5zaWRlIjpbMiw5XSwidGhlbiI6WzJdLCJjYW4iOlsyLDMsNCw3LDldLCJtb2RpZmllZCI6WzJdLCJuZWVkZWQiOlsyXSwib3JkZXIiOlsyXSwiZmluZCI6WzJdLCJyZXF1aXJlZCI6WzJdLCJwYXJhbWV0ZXIiOlsyLDksMTAsMTEsMTJdLCJzdHJ1Y3R1cmUiOlsyLDldLCJzZXQiOlsyLDUsOV0sIm15bWVudWVudHJ5IjpbMl0sIm5vdGljZSI6WzJdLCJ0aGF0IjpbMiw5XSwiYWxzbyI6WzIsOF0sImFjY2Vzc2VkIjpbMl0sImRvbiI6WzJdLCJ0IjpbMl0sInBhc3MiOlsyXSwibmVlZCI6WzJdLCJhY2Nlc3MiOlsyLDldLCJyZWFzb24iOlsyXSwiZyI6WzJdLCJhZ2FpbiI6WzJdLCJyZWFkaW5nIjpbMl0sImF0IjpbMiw1LDldLCJydW50aW1lIjpbMl0sImJlaW5nIjpbMiw3XSwicmV0dXJucyI6WzIsOSwxMV0sImFzc2lnbmVkbWVudSI6WzJdLCJjaGFuZ2UiOlszLDEyXSwibG9nIjpbM10sIjIwMTYiOlszXSwiMDEiOlszXSwiMTEiOlszXSwidmVyc2lvbiI6WzMsNCwxMl0sIjUiOlszLDQsMTJdLCJkaXJlY3QiOlszXSwicHJldmlvdXNseSI6WzNdLCJldmFsdWF0ZWQiOlszLDldLCJfc2hvd3N1Ym1lbnUiOlszLDEyXSwicmV0dXJuIjpbMyw4LDksMTAsMTEsMTIsMTNdLCJmYWxzZSI6WzMsNSw4LDExLDEyXSwiYW55bW9yZSI6WzMsMTJdLCJkb2N1bWVudGF0aW9uIjpbM10sImZpcnN0IjpbMyw1XSwicHVibGljIjpbMyw0LDUsN10sInJlbGVhc2VkIjpbM10sIjIwMTUiOlszXSwiMTIiOlszXSwiMjIiOlszXSwiNCI6WzNdLCJlc2NhcGUiOlszLDgsMTNdLCJrZXkiOlszLDgsMTNdLCJjbG9zZXMiOlszLDEzXSwidG9vIjpbMyw5XSwid2lkdGgiOlszLDldLCJzZXR0aW5nIjpbM10sIjIxMHB4IjpbMyw5XSwicmVzaXplcyI6WzNdLCJjc3MiOlszLDgsOV0sInZhbHVlIjpbMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxM10sImJ1Z2ZpeCI6WzNdLCJyZWZlcnMiOlszXSwicHJvY2Vzc2luZyI6WzNdLCJvcmlnaW5hbCI6WzMsMTFdLCJ3YXMiOlszXSwicmVmZXJlbmNlZCI6WzNdLCJwcmV2aW91cyI6WzNdLCJpZGVudGljYWwiOlszXSwiZGVsZXRlZCI6WzNdLCIyMDEzIjpbM10sIjA2IjpbM10sIjE1IjpbM10sIjMiOlszXSwiYXV0byI6WzNdLCJpbml0aWFsaXppbmciOlszXSwidXBkYXRlZCI6WzNdLCJjc3MzIjpbM10sImZlYXR1cmVzIjpbM10sImJ1Z2ZpeGluZyI6WzNdLCIyMDA1IjpbM10sIjA5IjpbM10sIjAzIjpbM10sInN1Ym1lbnVzIjpbM10sIjA3IjpbM10sIjE3IjpbM10sInZpc2liaWxpdHkiOls0LDUsNiw3XSwidHlwZSI6WzQsNSw2LDcsOSwxMCwxMV0sImludGVnZXIiOls0LDZdLCJkZXNjcmlwdGlvbiI6WzQsNSw2LDcsOCw5LDEwLDExLDEyLDEzXSwiaW50ZXJuYWwiOls0XSwibnVtYmVyIjpbNF0sInVzZWQiOls0LDYsN10sImJhY2t3YXJkIjpbNF0sImNvbXBhdGliaWxpdHkiOls0XSwiaW5pdGlhbGl6ZWQiOls1LDhdLCJib29sZWFuIjpbNSw5LDExXSwiaGFwcGVucyI6WzVdLCJzdGFydCI6WzVdLCJ1bmlxdWVtZW51aWQiOls2LDldLCJwcm90ZWN0ZWQiOls2XSwidW5pcXVlIjpbNiw5XSwiaWRzIjpbNl0sIm5ldyI6WzZdLCJjYWxsaW5nIjpbNiw5XSwiaW5jcmVtZW50ZWQiOls2XSwiZXZlbiI6WzZdLCJiZWVuIjpbNiw3LDEwLDExXSwiZ2l2ZW4iOls2XSwiZXhwbGljaXRseSI6WzZdLCJodG1sZWxlbWVudCI6WzcsOSwxMF0sIm51bGwiOls3XSwic3RvcmVzIjpbNyw5XSwiX3Nob3dtZW51IjpbNywxMCwxMSwxMl0sIm9wZW5lZCI6WzcsMTEsMTIsMTNdLCJnZXQiOls3LDEwXSwiaW5mb3JtYXRpb24iOls3LDldLCJhYm91dCI6WzcsOV0sImV4ZWN1dGUiOls3LDExLDEyXSwiYWN0aW9ucyI6WzddLCJpbml0IjpbOF0sInBhcmFtZXRlcnMiOls4LDEzXSwibm8iOls4LDksMTAsMTNdLCJpbml0aWFsaXplcyI6WzhdLCJnbG9iYWwiOls4XSwic2V0cyI6WzhdLCJyZWdpc3RlcnMiOls4XSwic29tZXdoZXJlIjpbOCwxM10sImhpdHRpbmciOls4XSwiYWRkcyI6WzhdLCJzdHlsZXMiOls4XSwidGhlcmUiOls4XSwiYmxvY2siOls4XSwib3RoZXIiOls4LDldLCJkZWZpbml0aW9ucyI6WzhdLCJyZWR1Y2UiOls4XSwicHJvYmFiaWxpdHkiOls4XSwibmFtZSI6WzgsOV0sImNvbGxpc2lvbiI6WzhdLCJleGVjdXRlcyI6WzhdLCJ0YXJnZXQiOls5LDEwXSwicGFyYW1ldGVyc3N0cnVjdHVyZSI6WzldLCJvYmplY3Rqc29uIjpbOV0sIm9iamVjdCI6WzksMTEsMTJdLCJuZXdseSI6WzldLCJjcmVhdGVkIjpbOSwxMF0sImV4aXN0aW5nIjpbOV0sImNyZWF0ZXMiOls5XSwicmVwbGFjZSI6WzldLCJleHBlY3RzIjpbOV0sImpzb24iOls5XSwiYWJzdHJhY3QiOls5XSwiaGF2ZSI6WzksMTFdLCJmb2xsb3dpbmciOls5XSwibGlzdCI6WzldLCJhdHRyaWJ1dGVzIjpbOV0sIm1haW4iOls5XSwid3JhcHBlciI6WzldLCJwcmVmaXgiOls5XSwiYmFyIjpbOV0sImxlZnQiOls5XSwic2lkZSI6WzldLCJhbHdheXMiOls5LDEyXSwiZml4ZWQiOls5XSwiMjEwIjpbOV0sInBpeGVscyI6WzldLCJleHBhbmQiOls5XSwibG9uZ2VzdCI6WzldLCJzbyI6WzldLCJjdXQiOls5XSwib2ZmIjpbOV0sInZhbGlkIjpbOV0sIjIwMHB4IjpbOV0sIjIwIjpbOV0sIndpdGhvdXQiOls5XSwidHJhaWxpbmciOls5XSwic2VtaWNvbG9uIjpbOV0sImFycmF5IjpbOV0sImFjdHVhbCI6WzldLCJzYW1lIjpbOV0sInN5bnRheCI6WzldLCJlYWNoIjpbOV0sInJlcHJlc2VudHMiOls5XSwiaGVscGZ1bCI6WzldLCJsYXRlciI6WzldLCJjYXRpb24iOls5XSwiZXhlY3V0ZWQiOls5XSwidXNlciI6WzksMTEsMTNdLCJjbGlja3MiOls5LDExLDEzXSwiY2xvc2VkIjpbOV0sInNwZWNpZmllZCI6WzldLCJjYXNlIjpbOV0sInlvdXJzZWxmIjpbOV0sInlvdXIiOls5XSwibWFudWFsbHkiOls5LDExLDEyXSwiaGludCI6WzldLCJ0aG91Z2giOls5XSwic2VlIjpbOV0sImdvIjpbOV0sInRocm91Z2giOls5XSwic2VuZHMiOls5XSwiY3VycmVudHRhcmdldCI6WzldLCJyZXR1cm5lZCI6WzksMTJdLCJhcnJvdyI6WzldLCJiZWNvbWVzIjpbOV0sInRoaW4iOls5XSwiaG9yaXpvbnRhbCI6WzldLCJsaW5lIjpbOV0sInNlcGFyYXRlcyI6WzldLCJlZmZlY3QiOls5XSwiYm9sZCI6WzldLCJwYXJ0aWFsbHkiOls5XSwidHJhbnNwYXJlbnQiOls5XSwiY2xpY2tpbmciOls5XSwicGF0aCI6WzldLCJpbWFnZSI6WzldLCJmaWxlIjpbOV0sInJlbGF0aXZlIjpbOV0sImFic29sdXRlIjpbOV0sInRvb2x0aXAiOls5XSwicG9wdXAiOls5XSwiaG92ZXJzIjpbOV0sIm1vdXNlIjpbOV0sInBvaW50ZXIiOls5XSwib3ZlciI6WzldLCJsb25nIjpbOV0sIm1pZ2h0IjpbOV0sInNsaW0iOls5XSwibm9ybWFsIjpbOV0sImRlZmluZWQiOls5LDExXSwiZm9sbG93cyI6WzldLCJuZWl0aGVyIjpbOV0sIm5vciI6WzldLCJjcmVhdGlvbiI6WzldLCJteXN1Ym1lbnVpZCI6WzldLCJnbG9iZSI6WzldLCI5NiI6WzldLCJyYXRpbmciOls5XSwiZGlzYWJsZWRlbnRyeWlkIjpbOV0sInBhcmFsbGVsX3Rhc2tzIjpbOV0sInJlc3VsdHMiOls5XSwiZG9uZSI6WzldLCJzcGVjaWZ5aW5nIjpbOV0sInNlY29uZCI6WzldLCJhZnRlcndhcmRzIjpbOV0sImV4aXN0IjpbOV0sInRpbWUiOls5XSwic3VibWl0dGVkIjpbOSwxMSwxMl0sInN0b3JlZCI6WzldLCJteWRpdjEiOls5XSwicGFyYW1ldGVyc3RhcmdldCI6WzEwXSwiYXNzaWducyI6WzEwXSwib25jb250ZXh0bWVudSI6WzEwXSwicGFyYW1ldGVyc2V2ZW50IjpbMTEsMTJdLCJvcGVucyI6WzExLDEyXSwidGhleSI6WzExXSwic3VwcHJlc3MiOlsxMV0sInVubGlrZSI6WzEyXSwic2luY2UiOlsxMl0sIndoaWxlIjpbMTJdLCJwcmVzc2VkIjpbMTNdfSwiY2F0ZWdvcmllcyI6WyJBdHRyaWJ1dGVzIiwiTWV0aG9kcyJdfQ==";
var mainTitle = "Q00gTWVudQ==";

function buildTopicsList(categoryID)
{
	var menuListTopicsWrapper = document.getElementsByClassName("menuListTopicsWrapper")[0];

	// Clear list
	menuListTopicsWrapper.innerHTML = "";

	// Create items
	if (categoryID === null)
	{
		// Set items of first category
		var categoryItems = pageData.topicsList;
	}
	else
	{
		// Find requested category data
		var categoryData = getTopicsCategoryData(categoryID, pageData.topicsList);

		// Get type (exception: if null, use some word for "root category")
		if (categoryData.parentCategory === null)
		{
			var categoryName = "Back";
		}
		else
		{
			var categoryName = pageData.categories[categoryData.parentCategory];
		}

		// Create back button
		var listEntry = document.createElement("div");
		listEntry.setAttribute("title", categoryName);
		listEntry.setAttribute("onclick", "buildTopicsList(" + categoryData.parentCategory + ");");  // null will be converted automatically to "null" (string)
		menuListTopicsWrapper.appendChild(listEntry);

		var i1 = document.createElement("img");
		i1.setAttribute("src", "interface/back.svg");
		i1.setAttribute("class", "icon small");
		listEntry.appendChild(i1);

		var i2 = document.createElement("div");
		i2.setAttribute("class", "backEntryText");
		i2.textContent = categoryName;
		listEntry.appendChild(i2);

		// Get sub items of requested category
		var categoryItems = categoryData.subitems;
	}

	// Create sub entries (pages and categories)
	for (var i=0; i < categoryItems.length; i++)
	{
		var entry = categoryItems[i];

		if (typeof(entry) === "object")
		{
			// Create category entry
			var listEntry = document.createElement("div");
			listEntry.setAttribute("title", pageData.categories[entry.category]);
			listEntry.setAttribute("onclick", "buildTopicsList(" + entry.category + ");");
			menuListTopicsWrapper.appendChild(listEntry);

			var i1 = document.createElement("img");
			i1.setAttribute("src", "interface/folder.svg");
			i1.setAttribute("class", "icon");
			listEntry.appendChild(i1);

			var i2 = document.createElement("div");
			i2.setAttribute("class", "categoryEntryText");
			i2.textContent = pageData.categories[entry.category];
			listEntry.appendChild(i2);

			var i3 = document.createElement("img");
			i3.setAttribute("src", "interface/next.svg");
			i3.setAttribute("class", "icon small");
			listEntry.appendChild(i3);
		}
		else
		{
			// Create page entry
			var listEntry = document.createElement("div");
			listEntry.setAttribute("title", pageData.fileList[entry].topicTitle);
			listEntry.setAttribute("onclick", "loadPage('" + pageData.fileList[entry].file + "');");
			menuListTopicsWrapper.appendChild(listEntry);

			var i1 = document.createElement("img");
			i1.setAttribute("src", "interface/related.svg");
			i1.setAttribute("class", "icon");
			listEntry.appendChild(i1);

			var i2 = document.createElement("div");
			i2.setAttribute("class", "pageEntryText");
			i2.textContent = pageData.fileList[entry].topicTitle;
			listEntry.appendChild(i2);
		}
	}
}

function getTopicsCategoryData(categoryID, categoryData)
{
	var ret = null;

	for (var entry=0; entry < categoryData.length; entry++)
	{
		if (typeof(categoryData[entry]) == "object")
		{
			if (categoryData[entry].category === categoryID)
			{
				ret = categoryData[entry];
				break;
			}
			else
			{
				var ret2 = getTopicsCategoryData(categoryID, categoryData[entry].subitems);

				if (ret2 !== null)
				{
					ret = ret2;
					break;
				}
			}
		}
	}

	return ret;
}

function toggleSearch(show, forceClose)
{
	var headerSearch = document.getElementById("headerSearch");
	var headerSearchButtonWrapper = document.getElementById("headerSearchButtonWrapper");
	var headerSearchButton = document.getElementById("headerSearchButton");

	if (show)
	{
		headerSearch.classList.remove("closed");

		// Show placeholder asynchroniously after animation finished (otherwise it will not animate!)
		window.setTimeout("document.getElementById('headerSearch').placeholder='Search';", 200);

		headerSearchButtonWrapper.style.backgroundColor = "#ffffff";
		headerSearchButton.classList.remove("headerSearchButtonClosed");
	}
	if
	(
		(!show) &&
		(
			(headerSearch.value.trim() == "") ||
			(forceClose)
		)
	)
	{
		headerSearch.classList.add("closed");

		// Hide placeholder asynchroniously after animation finished (otherwise it will not animate!)
		window.setTimeout("document.getElementById('headerSearch').placeholder='';", 200);

		headerSearchButtonWrapper.style.backgroundColor = "#8BA4B5";
		headerSearchButton.classList.add("headerSearchButtonClosed");
	}
}

function headerSearchButtonMouseUp(forceShow)
{
	if
	(
		(
			(typeof(forceShow) == "undefined") &&
			(headerSearchFocused)
		)
		||
		(
			(typeof(forceShow) != "undefined") &&
			(!forceShow)
		)
	)
	{
		document.getElementById("headerSearch").blur();
		toggleSearch(false, true);  // force to close
		headerSearchFocused = false;
	}
	else if
	(
		(
			(typeof(forceShow) == "undefined") &&
			(!headerSearchFocused)
		)
		||
		(
			(typeof(forceShow) != "undefined") &&
			(forceShow)
		)
	)
	{
		document.getElementById("headerSearch").focus();
		headerSearchFocused = true;
	}
}

function toggleMenu(forceShow)
{
	var menuWrapper = document.getElementsByClassName("menuWrapper")[0];
	var mainContent = document.getElementsByClassName("mainContent")[0];
	var page_header_leftWrapper = null;
	if (document.getElementsByClassName("page_header_leftWrapper"))
	{
		page_header_leftWrapper = document.getElementsByClassName("page_header_leftWrapper")[0];
	}

	if
	(
		(
			(typeof(forceShow) == "undefined") &&
			(leftMenuOpened)
		)
		||
		(
			(typeof(forceShow) != "undefined") &&
			(!forceShow)
		)
	)
	{
		menuWrapper.style.left = "-200px";
		mainContent.style.marginLeft = "0";

		// Add margin left to the title of the loaded page so the menu button does not overlap it
		if (page_header_leftWrapper)
		{
			page_header_leftWrapper.style.left = "40px";  // should correspond with .menuTypesCaption style in style.css (or at least not smaller then width of .menuButton
		}

		leftMenuOpened = false;
	}
	else if
	(
		(
			(typeof(forceShow) == "undefined") &&
			(!leftMenuOpened)
		)
		||
		(
			(typeof(forceShow) != "undefined") &&
			(forceShow)
		)
	)
	{
		menuWrapper.style.left = "0";
		mainContent.style.marginLeft = "200px";

		// Move page title back to left if menu is shown
		if (page_header_leftWrapper)
		{
			page_header_leftWrapper.style.left = "14px";
		}

		leftMenuOpened = true;
	}
}

function selectListType(entry, type, dontHideTypesMenu)
{
	if
	(
		(typeof(dontHideTypesMenu) == "undefined") ||
		(!dontHideTypesMenu)
	)
	{
		toggleTypesMenu(false);
	}

	if (document.getElementsByClassName(type)[0].dataset.visibilitystate != "1")
	{
		var types = ["menuListTopicsWrapper", "menuListIndexWrapper", "menuListSearchWrapper", "menuListRelatedPagesWrapper", "menuListBookmarksWrapper"];

		// Hide all other lists
		for (var i=0; i < types.length; i++)
		{
			if (types[i] != type)
			{
				document.getElementsByClassName(types[i])[0].style.opacity = "0";
				document.getElementsByClassName(types[i])[0].dataset.visibilitystate = "0";  // set special attribute instantly
				window.setTimeout("document.getElementsByClassName('" + types[i] + "')[0].style.display = 'none';", 200);
			}
		}

		// Set special attribute instantly
		document.getElementsByClassName(type)[0].dataset.visibilitystate = "1";

		// Show selected list (after other have disappeared)
		window.setTimeout("document.getElementsByClassName('" + type + "')[0].style.display = 'block';", 200);
		window.setTimeout("document.getElementsByClassName('" + type + "')[0].style.opacity = '0';", 201);
		window.setTimeout("document.getElementsByClassName('" + type + "')[0].style.opacity = '1';", 250);

		// Update title
		var menuTypesCaption = document.getElementsByClassName("menuTypesCaption")[0];
		menuTypesCaption.textContent = entry.textContent;

		// Search results list entry has brackets for amount of found search results which must not go to caption
		if (menuTypesCaption.textContent.indexOf(" (") != -1)
		{
			menuTypesCaption.textContent = menuTypesCaption.textContent.substr(0, menuTypesCaption.textContent.indexOf(" ("));
		}
	}
}

function toggleTypesMenu(forceShow)
{
	var menuTypesToggleArrowRotator = document.getElementsByClassName("menuTypesToggleArrowRotator")[0];
	var menuTypeWrapper = document.getElementsByClassName("menuTypeWrapper")[0];

	if
	(
		(menuTypesToggleArrowRotator) &&
		(menuTypeWrapper)
	)
	{
		// Note: Use max-height attribute instead of height to allowe transition to work correctly!
		// Set maxHeight slightly (!) above the height that would normally ever be. It CAN be bigger
		// and it will still open only as high as the content is, but the transition time will apply
		// to the new hight, which means that if you set it too much, the effect might go to fast.
		if
		(
			(
				(typeof(forceShow) == "undefined") &&
				(menuTypesOpened)
			)
			||
			(
				(typeof(forceShow) != "undefined") &&
				(!forceShow)
			)
		)
		{
			menuTypesToggleArrowRotator.style.webkitTransform = "rotate(0deg)";
			menuTypesToggleArrowRotator.style.mozTransform = "rotate(0deg)";
			menuTypesToggleArrowRotator.style.msTransform = "rotate(0deg)";
			menuTypesToggleArrowRotator.style.oTransform = "rotate(0deg)";
			menuTypesToggleArrowRotator.style.transform = "rotate(0deg)";
			menuTypeWrapper.style.maxHeight = "0px";
		}
		else if
		(
			(
				(typeof(forceShow) == "undefined") &&
				(!menuTypesOpened)
			)
			||
			(
				(typeof(forceShow) != "undefined") &&
				(forceShow)
			)
		)
		{
			menuTypesToggleArrowRotator.style.webkitTransform = "rotate(90deg)";
			menuTypesToggleArrowRotator.style.mozTransform = "rotate(90deg)";
			menuTypesToggleArrowRotator.style.msTransform = "rotate(90deg)";
			menuTypesToggleArrowRotator.style.oTransform = "rotate(90deg)";
			menuTypesToggleArrowRotator.style.transform = "rotate(90deg)";
			menuTypeWrapper.style.maxHeight = "170px";
		}

		menuTypesOpened = !menuTypesOpened;
	}
}

if (!Element.prototype.delete)
{
	Element.prototype.delete = function() {
		this.parentNode.removeChild(this);
	};
}

window.addEventListener("load", function(evt)
{
	// Decode main dataset information
	pageData = JSON.parse(Base64.decode(pageData));

	if (window.location.hash.substr(1).length > 0)
	{
		// If hash in URL (e. g. the user coming from a bookmark), load it
		var uriHash = window.location.hash.substr(1);

		// Fix Mozilla Firefox's bug
		// They decode the URI / hash automatically...
		// But some recent comments their bugtracker says, that it might have been fixed in newest nightly builds (todo: check!)
		// [Edit: Bug was fixed in Firefox 41]
		if (is_firefox && !is_firefox41)
		{
			uriHash = encodeURIComponent(uriHash);
		}

		loadPage(uriHash);
	}
	else
	{
		// Otherwise load the default start page (global variable set by COIN.DOCU when generated)
		if (startPage != "")
		{
			loadPage(startPage);
		}
		else
		{
			// If no starting page set, just take first page
			if (pageData.fileList.length > 0 )
			{
				loadPage(pageData.fileList[0].file);
			}
			else
			{
				document.getElementById("mainContent").textContent = "Error: No pages available!";
			}
		}
	}

	// If docu is opened in small resolution, collapse menu and search field
	if (window.innerWidth < 700)
	{
		toggleMenu(false);
		headerSearchButtonMouseUp(false);
	}

	// Build bookmark list
	rebuildBookmarkList();

	// Build index and search list
	buildIndexAndSearchList();

	// Build topics list
	buildTopicsList(null);

	// Start JS browser history
	jsBrowserHistory();
}, false);


document.addEventListener("keydown", function(evt)
{
	var evt = (evt) ? evt : ((event) ? event : null);
	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);

	// If escape key
	if (evt.keyCode == 27)
	{
		document.getElementsByClassName("bookmarkWrapper")[0].style.display = "none";
		document.getElementsByClassName("relatedPagesWrapper")[0].style.display = "none";
	}
}, false);


document.addEventListener("click", function(evt)
{
	document.getElementsByClassName("bookmarkWrapper")[0].style.display = "none";
	document.getElementsByClassName("relatedPagesWrapper")[0].style.display = "none";
}, false);


function jsBrowserHistory()
{
	if
	(
		(typeof(window.location.hash) != "undefined") &&
		(window.location.hash != "")
	)
	{
		var uriHash = window.location.hash.split('#')[1];

		// Fix Mozilla Firefox's bug
		// They decode the URI / hash automatically...
		// But some recent comments their bugtracker says, that it might have been fixed in newest nightly builds (todo: check!)
		// [Edit: Bug was fixed in Firefox 41]
		if (is_firefox && !is_firefox41)
		{
			uriHash = encodeURIComponent(uriHash);
		}

		if (uriHash != currentPage)  // Go ahead only if hash (anchor) has changed (browser's back / forward button clicked)
		{
			loadPage(uriHash);
		}
	}

	window.setTimeout("jsBrowserHistory();", 100);
}

function loadPage(file)
{
	if (document.getElementsByClassName("progress_spinner").length == 1)
	{
		document.getElementsByClassName("progress_spinner")[0].style.display = "inline-block";
		window.setTimeout('currentPage = "' + file + '"; window.location.hash = "#' + file + '"; loadFile("pages/' + encodeURIComponent(file) + '");', 10);  // Call "asynchronously"
	}
	else
	{
		currentPage = file;
		window.location.hash = "#" + file;
		loadFile("pages/" + encodeURIComponent(file));
	}

	scrollUp();
}

function loadFile(filename)
{
	var fileref = document.createElement("script");
	fileref.setAttribute("type","text/javascript");
	fileref.setAttribute("src", filename);
	fileref.setAttribute("data-pageloader", "1");  // Helps to identify element to remove later
	
	// Add and immediatelly delete (browser will load it anyway)
	document.getElementsByTagName("head")[0].appendChild(fileref);
}

function replacePageContents(text, title, related)
{
	//
	// Note: Hiding the progress spinner not necessary, since it is part of loaded page
	//

	// Remove <script> helper tag(s) which loaded the page
	var pageloaders = document.getElementsByTagName("script");

	for (var i=0; i < pageloaders.length; i++)
	{
		if
		(
			(pageloaders[i].dataset)
			&& (pageloaders[i].dataset.pageloader)
		)
		{
			pageloaders[i].delete();
		}
	}

	// Replace content with loaded page
	document.getElementById("mainContent").innerHTML = Base64.decode(text);

	// Add the loadPage() function as a wrapper around local page linking
	var pageLinks = document.getElementById("mainContent").getElementsByTagName("a");

	for (var iPageLink=0; iPageLink < pageLinks.length; iPageLink++)
	{
		if (pageLinks[iPageLink].getAttribute("href").substr(0, ("pages/").length) == "pages/")
		{
			/*
			pageLinks[iPageLink].setAttribute("data-link", pageLinks[iPageLink].getAttribute("href").substr(("pages/").length));
			pageLinks[iPageLink].setAttribute("onclick", "javascript: loadPage(this.dataset.link);");
			pageLinks[iPageLink].setAttribute("href", "javascript:;");
			*/

			pageLinks[iPageLink].setAttribute("href", "javascript: loadPage('" + /*encodeURIComponent*/(pageLinks[iPageLink].getAttribute("href").substr(("pages/").length)) + "');");
		}
	}

	// Update page title
	document.title = Base64.decode(mainTitle) + " - " + Base64.decode(title);

	// Store related pages
	relatedPages = JSON.parse(Base64.decode(related));

	// Indent page's title
	// Note: Do this after page content was replaced!
	if (!leftMenuOpened)
	{
		var page_header_leftWrapper = document.getElementsByClassName("page_header_leftWrapper")[0];
		page_header_leftWrapper.style.left = "40px";  // should correspond with .menuTypesCaption style in style.css (or at least not smaller then width of .menuButton
	}

	// Build lists but do not show them now
	showRelatedPages(true);
}

function printPage()
{
	toggleMenu(false);  // Hide menu for printing
	headerSearchButtonMouseUp(false);  // Hide search field for printing
	window.print();
}

function bookmarkPage(type)
{
	if (typeof(type) == "undefined")
	{
		document.getElementsByClassName("bookmarkWrapper")[0].style.display = "block";
	}
	else
	{
		if (type == "browser")
		{
			document.getElementsByClassName("bookmarkWrapper")[0].style.display = "none";
			alert("For security reasons, adding bookmarks is forbidden in modern browsers. Use following key combinations to add a bookmark.\n\nSafari: Cmd + D\nOther browsers: Ctrl + D\n\nAlternatively, add a documentation bookmark.");
		}
		else if (type == "documentation")
		{
			document.getElementsByClassName("bookmarkWrapper")[0].style.display = "none";

			if (window.location.protocol == "file:")
			{
				alert("Due to browser security restrictions, this feature is not available when the documentation is opened on your local computer. Either place this documentation on a webserver or use browser's default bookmark functionality.");
			}
			else
			{
				// Get opened page from URL hash
				var pageFilename = window.location.hash.substr(1);
				var pageTitle = document.title;
				var bookmarkFirstTime = localStorage.getItem("bookmarkFirstTime");
				var bookmarkList = localStorage.getItem("bookmarkList");
				bookmarkList = (bookmarkList === null ? JSON.parse("{}") : JSON.parse(bookmarkList));

				// Check if already in bookmark list
				if (typeof(bookmarkList[pageFilename]) == "undefined")
				{
					// Add to bookmark list and save back to localStorage
					bookmarkList[pageFilename] = pageTitle;
					localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));

					// Rebuild full bookmark list
					rebuildBookmarkList();
				}

				// If bookmark feature has been used first time, expand type menu and open bookmark list in left menu
				if (bookmarkFirstTime === null)
				{
					selectListType(document.getElementById("menuTypeBookmarks"), "menuListBookmarksWrapper", true);
					toggleTypesMenu(true);
					localStorage.setItem("bookmarkFirstTime", "1");
				}
			}
		}
	}
}

function deleteBookmark(pageFilename)
{
	// Load bookmark list
	var bookmarkList = localStorage.getItem("bookmarkList");
	bookmarkList = (bookmarkList === null ? JSON.parse("{}") : JSON.parse(bookmarkList));

	// Delete bookmark from list
	if (typeof(bookmarkList[pageFilename]) != "undefined")
	{
		delete bookmarkList[pageFilename];
	}

	// Save bookmark list
	localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));

	// Rebuild full bookmark list
	rebuildBookmarkList();
}

function rebuildBookmarkList()
{
	if (window.location.protocol != "file:")
	{
		var bookmarkList = localStorage.getItem("bookmarkList");
		bookmarkList = (bookmarkList === null ? JSON.parse("{}") : JSON.parse(bookmarkList));
		var menuListBookmarksWrapper = document.getElementsByClassName("menuListBookmarksWrapper")[0];

		// Clear list
		menuListBookmarksWrapper.innerHTML = "";

		if (Object.keys(bookmarkList).length > 0)  // Object.keys see http://kangax.github.io/compat-table/es5/
		{
			for (var pageFilename in bookmarkList)
			{
				var bookmarkItem = document.createElement("div");
				bookmarkItem.setAttribute("title", bookmarkList[pageFilename]);
				bookmarkItem.setAttribute("onclick", "loadPage('" + pageFilename + "');");
				menuListBookmarksWrapper.appendChild(bookmarkItem);

				var i1 = document.createElement("img");
				i1.setAttribute("src", "interface/bookmark.svg");
				i1.setAttribute("class", "i1");
				bookmarkItem.appendChild(i1);

				var i2 = document.createElement("div");
				i2.setAttribute("class", "i2");
				i2.textContent = bookmarkList[pageFilename];
				bookmarkItem.appendChild(i2);

				var i3 = document.createElement("img");
				i3.setAttribute("src", "interface/bookmark_delete.svg");
				i3.setAttribute("onclick", "cancelEventPropagation(event); deleteBookmark('" + pageFilename + "');");
				i3.setAttribute("class", "i3");
				i3.setAttribute("title", "Delete bookmark");
				bookmarkItem.appendChild(i3);
			}
		}
		else
		{
			var noBookmarksText = document.createElement("span");
			noBookmarksText.setAttribute("class", "noBookmarks");
			noBookmarksText.textContent = "No bookmarks added";
			menuListBookmarksWrapper.appendChild(noBookmarksText);
		}
	}
	else
	{
		// Clear list and show notification
		var menuListBookmarksWrapper = document.getElementsByClassName("menuListBookmarksWrapper")[0];

		menuListBookmarksWrapper.innerHTML = "";

		var noBookmarksText = document.createElement("span");
		noBookmarksText.setAttribute("class", "noBookmarks");
		noBookmarksText.textContent = "Due to browser security restrictions, this feature is not available when the documentation is opened on your local computer. Either place this documentation on a webserver or use browser's default bookmark functionality.";
		menuListBookmarksWrapper.appendChild(noBookmarksText);
	}
}

function showRelatedPages(buildOnly)
{
	var relatedPagesWrapper = document.getElementsByClassName("relatedPagesWrapper")[0];
	var menuListRelatedPagesWrapper = document.getElementsByClassName("menuListRelatedPagesWrapper")[0];

	if
	(
		(typeof(buildOnly) != "undefined") &&
		(buildOnly)
	)
	{
		relatedPagesWrapper.innerHTML = "";
		menuListRelatedPagesWrapper.innerHTML = "";

		if (relatedPages.length > 0)
		{
			for (var i=0; i < relatedPages.length; i++)
			{
				// Build for popup
				var relatedPageItem = document.createElement("div");
				relatedPageItem.setAttribute("onclick", "loadPage('" + relatedPages[i].file + "'); document.getElementsByClassName('relatedPagesWrapper')[0].style.display='none';");
				relatedPageItem.textContent = relatedPages[i].title;
				relatedPagesWrapper.appendChild(relatedPageItem);

				// Build for left menu
				var relatedPageItem = document.createElement("div");
				relatedPageItem.setAttribute("title", relatedPages[i].title);
				relatedPageItem.setAttribute("onclick", "loadPage('" + relatedPages[i].file + "');");
				menuListRelatedPagesWrapper.appendChild(relatedPageItem);

				var i1 = document.createElement("img");
				i1.setAttribute("src", "interface/related.svg");
				i1.setAttribute("class", "i1");
				relatedPageItem.appendChild(i1);

				var i2 = document.createElement("div");
				i2.setAttribute("class", "i2");
				i2.textContent = relatedPages[i].title;
				relatedPageItem.appendChild(i2);
			}
		}
		else
		{
			// For popup
			var noRelatedPagesText = document.createElement("span");
			noRelatedPagesText.setAttribute("class", "noRelatedPagesPopup");
			noRelatedPagesText.textContent = "No related pages";
			relatedPagesWrapper.appendChild(noRelatedPagesText);

			// For left menu
			var noRelatedPagesText = document.createElement("span");
			noRelatedPagesText.setAttribute("class", "noRelatedPagesLeftMenu");
			noRelatedPagesText.textContent = "No related pages";
			menuListRelatedPagesWrapper.appendChild(noRelatedPagesText);
		}
	}
	else
	{
		relatedPagesWrapper.style.display = "block";
	}
}

// This is called only once after page loaded
function buildIndexAndSearchList()
{
	var menuListIndexSearchWrapper = document.getElementsByClassName("menuListIndexSearchWrapper")[0];
	var menuListSearchResultsWrapper = document.getElementsByClassName("menuListSearchResultsWrapper")[0];
	menuListIndexSearchWrapper.innerHTML = "";
	menuListSearchResultsWrapper.innerHTML = "";

	// Build index list
	if (pageData.fileList.length > 0)
	{
		for (var i=0; i < pageData.fileList.length; i++)
		{
			var indexItem = document.createElement("div");
			indexItem.setAttribute("title", pageData.fileList[i].indexTitle);
			indexItem.setAttribute("onclick", "loadPage('" + pageData.fileList[i].file + "');");
			menuListIndexSearchWrapper.appendChild(indexItem);

			var i1 = document.createElement("img");
			i1.setAttribute("src", "interface/related.svg");
			i1.setAttribute("class", "i1");
			indexItem.appendChild(i1);

			var i2 = document.createElement("div");
			i2.setAttribute("class", "i2");
			i2.textContent = pageData.fileList[i].indexTitle;
			indexItem.appendChild(i2);
		}
	}

	// Build search list (create all inputs, but hidden)
	if (pageData.fileList.length > 0)
	{
		for (var i=0; i < pageData.fileList.length; i++)
		{
			var indexItem = document.createElement("div");
			indexItem.setAttribute("title", pageData.fileList[i].indexTitle);
			indexItem.setAttribute("onclick", "loadPage('" + pageData.fileList[i].file + "');");
			menuListSearchResultsWrapper.appendChild(indexItem);

			var i1 = document.createElement("img");
			i1.setAttribute("src", "interface/related.svg");
			i1.setAttribute("class", "i1");
			indexItem.appendChild(i1);

			var i2 = document.createElement("div");
			i2.setAttribute("class", "i2");
			i2.textContent = pageData.fileList[i].indexTitle;
			indexItem.appendChild(i2);
		}
	}
}

function doSearch(searchText)
{
	var fileIndecesMatching = [];
	var searchWords = [];

	// Replace commas by empty spaces in case user splits words like that and split words
	searchText = searchText.replace(/[,]/g, " ");
	searchText = searchText.toLowerCase();
	searchText = searchText.split(" ");

	// Prepare search words
	for (var i=0; i < searchText.length; i++)
	{
		if (searchText[i].trim().length > 0)
		{
			searchWords.push(searchText[i].trim());
		}
	}

	// Search
	for (var word in pageData.search)
	{
		for (var sw=0; sw < searchWords.length; sw++)
		{
			if (word.toLowerCase().trim().indexOf(searchWords[sw]) != -1)
			{
				fileIndecesMatching.pushUnique(pageData.search[word]);
			}
		}
	}

	// Show left menu search wrapper
	selectListType(document.getElementById("menuTypeSearchResults"), "menuListSearchWrapper", true);

	if (fileIndecesMatching.length > 0)
	{
		// Show or hide types menu entry
		document.getElementById("menuTypeSearchResults").style.display = "block";

		// Hide "No search results for ..." sub-wrapper
		document.getElementsByClassName("noSearchResultsLeftMenu")[0].style.display = "none";
	}
	else
	{
		// Show "No search results for ..." sub-wrapper
		document.getElementsByClassName("noSearchResultsLeftMenu")[0].style.display = "block";
		document.getElementsByClassName("noSearchResultsLeftMenu")[0].innerHTML = "No search results for<br>\"" + searchText.join(" ") + "\"";

		// Show or hide types menu entry
		if (searchText.join(" ").trim().length == 0)
		{
			document.getElementById("menuTypeSearchResults").style.display = "none";
			document.getElementsByClassName("noSearchResultsLeftMenu")[0].style.display = "none";
		}
	}

	// Update search results amount indicator
	document.getElementById("searchResultsAmount").textContent = "(" + fileIndecesMatching.length + ")";

	// Go through all entries and show / hide them
	var menuListSearchResultsWrapper = document.getElementsByClassName("menuListSearchResultsWrapper")[0];
	var listItems = menuListSearchResultsWrapper.getElementsByClassName("i2");

	for (var i=0; i < listItems.length; i++)
	{
		listItems[i].parentNode.style.display = (fileIndecesMatching.indexOf(i) != -1) ? "block" : "none";
	}
}

function indexQuicksearch(searchText)
{
	var menuListIndexSearchWrapper = document.getElementsByClassName("menuListIndexSearchWrapper")[0];
	var listItems = menuListIndexSearchWrapper.getElementsByClassName("i2");

	searchText = searchText.toLowerCase().trim();

	for (var i=0; i < listItems.length; i++)
	{
		if
		(
			(searchText == "") ||
			(listItems[i].textContent.toLowerCase().trim().indexOf(searchText) != -1)
		)
		{
			listItems[i].parentNode.style.display = "block";
		}
		else
		{
			listItems[i].parentNode.style.display = "none";
		}
	}
}

function scrollUp()
{
	var pageYOffset = 0;

	if (window.pageYOffset)  // Firefox
	{
		pageYOffset = window.pageYOffset;
	}
	else  // IE >= 4.0, others...
	{
		// If doctype decleration set so standard conform mode active
		if (document.documentElement.scrollTop > 0)
		{
			pageYOffset = document.documentElement.scrollTop;
		}
		// otherwise
		else if (document.body.scrollTop > 0)
		{
			pageYOffset = document.body.scrollTop;
		}
	}

	if (pageYOffset > 0)
	{
		window.scrollTo(0, (pageYOffset / 2) - 1);
		setTimeout('scrollUp()', 40);  // 40ms = 25fps, 33ms = 30fps
	}
}

Array.prototype.pushUnique = function(values)
{
    for (var i=0; i < values.length; i++)
    {
        if (this.indexOf(values[i]) == -1)
        {
            this.push(values[i]);
        }
    }
}

if (!Array.prototype.indexOf)
{
	Array.prototype.indexOf = function(searchElement)
	{
		for (var i = 0; i < this.length; i++)
		{
			if (this[i] === searchElement)
			{
				return i;
			}
		}

		return -1;
	}
}

function cancelEventPropagation(e)
{
	if (e !== undefined)
	{
		if (!e)
		{
			var e = window.event;
		}

		e.cancelBubble = true;

		if (e.stopPropagation)
		{
			e.stopPropagation();
		}
	}
}

var Base64 = {
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length)
		{
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2))
			{
				enc3 = enc4 = 64;
			}
			else if (isNaN(chr3))
			{
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		}
		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = '';
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

		while (i < input.length)
		{
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64)
			{
				output = output + String.fromCharCode(chr2);
			}

			if (enc4 != 64)
			{
				output = output + String.fromCharCode(chr3);
			}
		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,'\n');
		var utftext = '';

		for (var n = 0; n < string.length; n++)
		{
			var c = string.charCodeAt(n);
			if (c < 128)
			{
				utftext += String.fromCharCode(c);
			}

			else if((c > 127) && (c < 2048))
			{
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}

			else
			{
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = '';
		var i = 0;
		var c = c1 = c2 = 0;

		while (i < utftext.length)
		{
			c = utftext.charCodeAt(i);
			if (c < 128)
			{
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224))
			{
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else
			{
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}
