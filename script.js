let records = [];
let fieldNames = [];

async function loadRecords() {
  const response = await fetch("records.json");
  records = await response.json();

  // Get field names from first record
  fieldNames = Object.keys(records[0]);

  buildRecordSelector();
  buildForm();
  loadRecord(1); // load first actual record
}

function buildRecordSelector() {
  const select = document.getElementById("record-select");

  records.forEach((rec, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = "Record " + index +" test";
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    loadRecord(select.value);
  });
}

function buildForm() {
  const container = document.getElementById("form-container");
  container.innerHTML = "";

  fieldNames.forEach(name => {
    const wrapper = document.createElement("div");
    wrapper.className = "field";

    const label = document.createElement("label");
    label.textContent = name;

    const input = document.createElement("input");
    input.id = name;

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    container.appendChild(wrapper);
  });
}

function loadRecord(index) {
  const record = records[index];

  fieldNames.forEach(name => {
    const input = document.getElementById(name);
    input.value = record[name];
  });
}

function showPreview() {
  const previewBox = document.getElementById("preview-box");
  const data = {};

  fieldNames.forEach(name => {
    const input = document.getElementById(name);
    data[name] = input.value;
  });

  previewBox.textContent = JSON.stringify(data, null, 2);
}

//document.getElementById("preview-btn").addEventListener("click", showPreview);

loadRecords();
