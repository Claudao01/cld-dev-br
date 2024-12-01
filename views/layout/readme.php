<div class="accordion-container">
    <button class="accordion-header">README.md</button>
    <div class="accordion-content">
        <?php
        require __DIR__ . '/../../vendor/autoload.php'; // Ajuste o caminho para o autoload

        use Parsedown;

        // Inicializa o Parsedown
        $parsedown = new Parsedown();

        // Caminho do README.md na raiz do projeto
        $markdownFile = __DIR__ . '/../../README.md';

        // Verifica se o arquivo existe
        if (file_exists($markdownFile)) {
            // Lê e converte o conteúdo do Markdown
            $markdownContent = file_get_contents($markdownFile);
            $htmlContent = $parsedown->text($markdownContent);
            echo $htmlContent;
        } else {
            echo "<p>O arquivo README.md não foi encontrado.</p>";
        }
        ?>
    </div>
</div>