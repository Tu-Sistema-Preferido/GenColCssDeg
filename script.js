document.addEventListener('DOMContentLoaded', function() {
    const color1 = document.getElementById('color1');
    const color2 = document.getElementById('color2');
    const color3 = document.getElementById('color3');
    const color4 = document.getElementById('color4');
    const direction = document.getElementById('direction');
    const shape = document.getElementById('shape');
    const output = document.querySelector('.output');
    const cssCode = document.getElementById('css-code');
    const copyBtn = document.getElementById('copy-btn');
    const customAlert = document.getElementById('custom-alert');

    function generateGradient() {
        let gradientType = direction.value === "circle" ? "radial-gradient" : "linear-gradient";
        let gradientDirection = direction.value === "circle" ? "circle" : direction.value;
        let gradient = `${gradientType}(${gradientDirection}, ${color1.value}, ${color2.value}, ${color3.value}, ${color4.value})`;

        let shapeStyle = '';
        switch(shape.value) {
            case 'ellipse':
                shapeStyle = '50% 50%';
                break;
            case 'circle':
                shapeStyle = '50%';
                break;
            case 'polygon':
                shapeStyle = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                break;
            case 'diamond':
                shapeStyle = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
                break;
        }

        output.style.background = gradient;
        output.style.clipPath = shapeStyle;
        cssCode.textContent = `background: ${gradient}; clip-path: ${shapeStyle};`;
    }

    function copyToClipboard() {
        const textArea = document.createElement('textarea');
        textArea.value = cssCode.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // Mostrar la alerta personalizada
        showCustomAlert();
    }

    function showCustomAlert() {
        customAlert.classList.remove('hidden');
        customAlert.classList.add('visible');

        // Ocultar la alerta después de 2 segundos
        setTimeout(function() {
            customAlert.classList.remove('visible');
            customAlert.classList.add('hidden');
        }, 3000);
    }

    color1.addEventListener('input', generateGradient);
    color2.addEventListener('input', generateGradient);
    color3.addEventListener('input', generateGradient);
    color4.addEventListener('input', generateGradient);
    direction.addEventListener('change', generateGradient);
    shape.addEventListener('change', generateGradient);
    copyBtn.addEventListener('click', copyToClipboard);

    // Generar el gradiente inicial
    generateGradient();
});
