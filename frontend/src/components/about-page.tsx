export function AboutPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Sobre Nosotros</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
          <p className="text-muted-foreground mb-4">
            Fundada en 2023, Feminine Elegance nació con la visión de empoderar a las mujeres a través de la moda, ofreciendo prendas y accesorios que resaltan la individualidad y estilo de cada una. Lo que comenzó como una pequeña boutique en línea se ha transformado en un referente para quienes buscan elegancia y autenticidad.
          </p>
          <p className="text-muted-foreground mb-4">
            Nuestra pasión por la moda nos impulsa a seleccionar cuidadosamente cada pieza, asegurando calidad y diseño en cada colección. Entendemos que cada mujer es única, y nos esforzamos por ofrecer opciones que se adapten a diversos gustos y ocasiones.
          </p>
          <p className="text-muted-foreground">
            A lo largo del tiempo, hemos establecido relaciones sólidas con diseñadores y proveedores, lo que nos permite presentar las últimas tendencias y clásicos atemporales a nuestra creciente comunidad de clientas.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
          <p className="text-muted-foreground mb-4">
            En Feminine Elegance, nuestra misión es clara: ofrecer moda accesible y de calidad que inspire confianza y estilo en cada mujer. Creemos que la moda es una forma de expresión y empoderamiento, y trabajamos para que cada clienta se sienta única y especial.
          </p>
          <p className="text-muted-foreground mb-4">Nos comprometemos a:</p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-4">
            <li>Ofrecer una amplia gama de ropa y accesorios para diversas ocasiones</li>
            <li>Proporcionar precios justos y competitivos</li>
            <li>Brindar un servicio al cliente excepcional</li>
            <li>Mantenernos al día con las últimas tendencias de la moda</li>
            <li>Fomentar una comunidad inclusiva y acogedora para todas las mujeres</li>
          </ul>
          <p className="text-muted-foreground">
            Estamos comprometidos con la mejora continua y valoramos los comentarios de nuestras clientas para seguir evolucionando y ofreciendo el mejor servicio posible.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
        <p className="text-muted-foreground mb-4">¿Tienes alguna pregunta o comentario? Nos encantaría saber de ti.</p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Correo Electrónico</h3>
            <p className="text-muted-foreground">contacto@feminineelegance.com</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Teléfono</h3>
            <p className="text-muted-foreground">+52 (555) 123-4567</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Dirección</h3>
            <p className="text-muted-foreground">Av. de la Moda 123, Ciudad de México, 01000</p>
          </div>
        </div>
      </div>
    </div>
  );
}