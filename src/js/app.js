document.addEventListener('DOMContentLoaded', function () {

    if (document.querySelector('.zelray')) {
        let tabs = document.querySelectorAll('.zelray__tab');
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) {
                    t.classList.remove('active-tab');
                });
                tab.classList.add('active-tab');
                let tabName = tab.getAttribute('data-tab');
                let tabContents = document.querySelectorAll('.zelray__tab-content');
                tabContents.forEach(function (content) {
                    content.classList.remove('active-content');
                });
                document.getElementById(tabName).classList.add('active-content');
            });
        });

    }


    if (document.querySelector('.counters')) {
        const counters = document.querySelectorAll('.counters');

        counters.forEach((counter) => {
            const input = counter.querySelector('input');

            counter.querySelector('.minus').addEventListener('click', () => {
                decrementCounter(input);
            });

            counter.querySelector('.plus').addEventListener('click', () => {
                incrementCounter(input);
            });
        });

        function incrementCounter(input) {
            let value = parseInt(input.value, 10);
            input.value = ++value;
        }

        function decrementCounter(input) {
            let value = parseInt(input.value, 10);
            if (value > 0) {
                input.value = --value;
            }
        }

    }

    if (document.querySelector('.zelray-trash__order-discount')) {
        document.querySelectorAll('.zelray-trash__order-discount').forEach(function (discountBlock) {
            const discountInput = discountBlock.querySelector('input');
            const applyButton = discountBlock.querySelector('button');

            discountInput.addEventListener('input', function () {
                if (discountInput.value.trim() !== '') {
                    discountInput.classList.add('has-value');
                    applyButton.classList.add('has-value');
                } else {
                    discountInput.classList.remove('has-value');
                    applyButton.classList.remove('has-value');
                }
            });
            discountInput.addEventListener('keypress', function (event) {
                const keyCode = event.keyCode;
                if (keyCode < 48 || keyCode > 57) {
                    event.preventDefault();
                }
            });
        });
    }

    if (document.querySelector('.zelray-trash')) {
        const tabContainers = document.querySelectorAll('.zelray__tab-content');
        tabContainers.forEach(function (tabContainer) {
            const checkboxAll = tabContainer.querySelector('.checkbox--all');
            const checkboxItems = tabContainer.querySelectorAll('.checkbox input');
            checkboxAll.addEventListener('change', function () {
                checkboxItems.forEach(function (item) {
                    item.checked = checkboxAll.checked;
                });
            });
            checkboxItems.forEach(function (item) {
                item.addEventListener('change', function () {
                    checkboxAll.checked = [...checkboxItems].every(function (item) {
                        return item.checked;
                    });
                });
            });
        });

    }


});


//lib datepicker start

//lib datepicker end


if (document.querySelector('.zelray-prices__dropdown')) {
    window.addEventListener('click', function (e) {
        for (const select of document.querySelectorAll('.zelray-prices__select-wrapper')) {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
            }
        }
    });
    for (const dropdown of document.querySelectorAll('.zelray-prices__select')) {
        dropdown.addEventListener('click', function () {
            this.querySelector('.zelray-prices__select-wrapper').classList.toggle('open');
        })
    }
    for (const option of document.querySelectorAll('.zelray-prices__select-option')) {
        option.addEventListener('click', function () {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.zelray-prices__select-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.zelray-prices__select-wrapper').querySelector('.zelray-prices__select-trigger input').textContent = this.textContent;
                this.closest('.zelray-prices__select-wrapper').querySelector('.zelray-prices__select-trigger input').value = this.textContent;
            }
        })
    }

}


document.addEventListener("DOMContentLoaded", function () {
    const searchField = document.getElementById('zelray-prices__search-field');
    const clearButton = document.getElementById('zelray-prices__clear-btn');
    const searchButton = document.getElementById('zelray-prices__search-btn');
    const tbody = document.querySelector('tbody');

    if (!searchField || !searchButton || !clearButton || !tbody) {
        console.error("Search field, search button, clear button, or table body element not found");
        return;
    }

    searchButton.addEventListener('click', filterRows);
    searchField.addEventListener('input', function () {
        if (searchField.value.trim() === '') {
            clearButton.style.display = 'none';
        } else {
            clearButton.style.display = 'block';
        }
        filterRows();
    });
    clearButton.addEventListener('click', function () {
        searchField.value = '';
        clearButton.style.display = 'none';
        filterRows();
    });
    searchField.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            filterRows();
        }
    });
});

function filterRows() {
    const searchField = document.getElementById('zelray-prices__search-field');
    const searchTerm = searchField.value.trim().toLowerCase();
    const tbody = document.querySelector('tbody');

    if (!tbody) {
        console.error("Table body element not found");
        return;
    }

    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let isVisible = false;
        cells.forEach(cell => {
            const nameElement = cell.querySelector('.name');
            if (nameElement) {
                const nameText = nameElement.textContent.toLowerCase();
                if (!cell.hasAttribute('data-label') ||
                    (cell.getAttribute('data-label') !== 'Выбрать кол-во' && cell.getAttribute('data-label') !== 'В корзину')) {
                    if (nameText.includes(searchTerm)) {
                        isVisible = true;
                    }
                    nameElement.innerHTML = highlightSearchTerm(nameElement.textContent, searchTerm);
                }
            } else {
                const cellText = cell.textContent.toLowerCase();
                if (!cell.hasAttribute('data-label') ||
                    (cell.getAttribute('data-label') !== 'Выбрать кол-во' && cell.getAttribute('data-label') !== 'В корзину')) {
                    if (cellText.includes(searchTerm)) {
                        isVisible = true;
                    }
                    cell.innerHTML = highlightSearchTerm(cell.textContent, searchTerm);
                }
            }
        });
        row.style.display = isVisible ? '' : 'none';
    });
}


function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    return text.replace(new RegExp(searchTerm, 'gi'), '<span class="highlight">$&</span>');
}


if (document.querySelector('#table')) {
    document.addEventListener("DOMContentLoaded", () => {
        const checkboxes = document.querySelectorAll('#table tbody input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const tr = checkbox.closest('tr');
                checkbox.checked ? tr.classList.add('selected') : tr.classList.remove('selected');
            });
        });
    });
}


