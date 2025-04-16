let ultimoElementofocado;
function gerenciarFocoModal(modalID) {
    const modal = document.getElementById(modalID);
    const elementosModal = modal.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const primeiroElemento = elementosModal[0];
    const ultimoElemento = elementosModal[elementosModal.length -1];

    primeiroElemento.focus();

    modal.addEventListener('keydown',(event)=> {
        if(event.key === "Tab") {
            if(event.shiftKey) {
                if(document.activeElement === primeiroElemento) {
                    event.preventDefault();
                    ultimoElemento.focus();
                }
            } else {
                if(document.activeElement === ultimoElemento) {
                    event.preventDefault();
                    primeiroElemento.focus();
                }
            }
        }
    })
}

let openedModal = null;

function alternarModal(modalID, toggleTag) {
    const modal = document.getElementById(modalID);

    if(toggleTag) {
        ultimoElementofocado = document.activeElement;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        openedModal = modalID;
        gerenciarFocoModal(modalID)
        if (openedModal === 'ver-modal-contato') {
            const  fields= document.querySelectorAll('#ver-modal-contato input, #ver-modal-contato textarea');
            fields.forEach(field => {
                if(field.type == 'radio' || field.type == 'checkbox') {
                    field.checked = false;
                } else {
                    field.value = '';
                }
            })
        }
    } else {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        openedModal = null;
        if(ultimoElementofocado) {
            ultimoElementofocado.focus();
        }
    }
}

document.addEventListener('keydown',(event) => {
    if(event.key === "Escape" && openedModal) {
        alternarModal(openedModal, false);

    } else if (event.key === "Escape") {
        document.querySelectorAll('.cabecalho__lista-item').forEach((item)=> {
            alternarSubmenu(item, false)
        });
    }
})

function alternarSubmenu(item, mostrar) {
    const submenu = item.querySelector(".submenu");
    if (submenu) {
        submenu.style.display = mostrar ? "block" : "none";

        const menuItem = document.querySelector(".cabecalho__lista-item a")
        menuItem.setAttribute("arie-expanded", mostrar ? true : false);

        const DropdownExpandedIcon = item.querySelector('.material-symbols-outlined.icone');
        DropdownExpandedIcon.classList.toggle("active", mostrar)
    };
}

//selecionar todos cabeçalhos_lista-item
document.querySelectorAll(".cabecalho__lista-item").forEach((item) => {
    //adicionar um ouvinte mouseover
    item.addEventListener("mouseover", ()=> alternarSubmenu(item, true));

    //adicinar um ouvinte mouseout
    item.addEventListener("mouseout", ()=> alternarSubmenu(item, false));

    item.addEventListener("click", ()=> {
        const submenu = item.querySelector('.submenu');
        const isDisplayed = submenu.style.display === "block";

        alternarSubmenu(item, !isDisplayed);
    });
});

//Acordeon

document.querySelectorAll(".botao-acordeao").forEach(button => {
    button.addEventListener("click", ()=> alternarAcordeao(button));
})

function alternarAcordeao(button) {
    const isOpen = button.getAttribute("arie-expanded") === true;

    document.querySelectorAll(".botao-acordeao").forEach(btn => {
        const content = btn.nextElementSibling;
        btn.setAttribute("aria-expanded", false);
        content.classList.remove("expandido");
        content.setAttribute("aria-hidden", true);
    })

    if(!isOpen) {
        const content = button.nextElementSibling;
        button.setAttribute("aria-expanded", true);
        content.classList.add("expandido");
        content.setAttribute("aria-hidden", false);
    }
}