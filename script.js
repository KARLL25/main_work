function generateTable() {
    const triggers = document.querySelectorAll('input[name="option"]:checked');
    const tools = document.querySelectorAll('input[name="tool"]:checked');
    
    
    let atLeastOneTriggerSelected = false;
    triggers.forEach(trigger => {
        if (trigger.checked) {
            atLeastOneTriggerSelected = true;
        }
    });

    
    if (!atLeastOneTriggerSelected) {
        const tableContainer = document.getElementById('tableContainer');
        tableContainer.innerHTML = '';
        return;
    }

    
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const headerCell = document.createElement('th');
    headerCell.textContent = 'Технологии \\ Триггеры';
    headerRow.appendChild(headerCell);
    triggers.forEach(trigger => {
        const th = document.createElement('th');
        th.textContent = trigger.nextElementSibling.textContent;
        headerRow.appendChild(th);
    });

    tools.forEach(tool => {
        const row = table.insertRow();
        const cell = row.insertCell();
        const link = document.createElement('a');
        const toolLink = tool.getAttribute('data-link');
        link.href = toolLink ? toolLink : '#'; 
        link.textContent = tool.nextElementSibling.textContent;
        cell.appendChild(link);
        
        const triggerValues = tool.getAttribute('data-trigger').split(',');
        
        triggers.forEach((trigger, index) => {
            const td = row.insertCell();
            const triggerValue = triggerValues[index].trim();
            td.textContent = triggerValue;
        });
    });
    
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', generateTable);
});

const filter = document.querySelector('.filter');
const tableContainer = document.getElementById('tableContainer');


generateTable();
tableContainer.insertAdjacentElement('afterend', filter);
