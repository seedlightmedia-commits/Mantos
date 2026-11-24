import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: 'Términos y condiciones de uso y compra en MANTOS.',
}

const WHATSAPP_URL =
  'https://wa.me/573114769412?text=' +
  encodeURIComponent('Hola MANTOS, tengo una pregunta sobre los términos y condiciones de compra.')

export default function TerminosPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <span className="eyebrow">MANTOS — INFORMACIÓN LEGAL</span>
        <h1>TÉRMINOS Y CONDICIONES</h1>
        <p>Condiciones de navegación y compra en MANTOS.</p>
      </header>

      <div className="legal-content">
        <section>
          <h2>1. Identificación y aceptación</h2>
          <p>Este sitio web es operado bajo el nombre comercial MANTOS por <strong>[COMPLETAR NOMBRE Y APELLIDOS DE LA PERSONA NATURAL RESPONSABLE]</strong>, en Colombia. Antes de publicar estos términos, debe completarse la información de identificación y contacto del responsable.</p>
          <p>Al navegar por el sitio aceptas estas condiciones de uso. La compra de productos se entiende realizada únicamente cuando el pedido haya sido confirmado por los canales de atención de MANTOS y se hayan acordado sus condiciones, disponibilidad, valor, envío y forma de pago.</p>
        </section>

        <section>
          <h2>2. Productos, imágenes y disponibilidad</h2>
          <p>En MANTOS presentamos prendas y productos de nuestras colecciones. Procuramos que las fotografías, descripciones, materiales, colores y características sean claros y fieles. Sin embargo, la visualización del color puede variar según la pantalla y las condiciones de iluminación.</p>
          <p>La disponibilidad de tallas y referencias puede cambiar. Si un producto no está disponible, te informaremos antes de confirmar la compra y cualquier pago asociado.</p>
        </section>

        <section>
          <h2>3. Precios y pagos</h2>
          <p>Los precios publicados se expresan en pesos colombianos (COP), salvo que se indique expresamente algo distinto. Los costos de envío u otros cargos aplicables se informarán antes de confirmar el pedido.</p>
          <p>Los medios y las instrucciones de pago se comunicarán durante la gestión del pedido. No envíes dinero a cuentas o números que no hayan sido confirmados por los canales oficiales de MANTOS. La confirmación del pedido estará sujeta a la verificación del pago cuando corresponda.</p>
        </section>

        <section>
          <h2>4. Pedidos y entregas</h2>
          <p>Para gestionar un pedido podremos solicitar nombre, teléfono, dirección de entrega y datos necesarios para identificar los productos solicitados. Es responsabilidad del comprador suministrar información completa y correcta.</p>
          <p>Los tiempos estimados, costos y condiciones de entrega se informarán antes de confirmar la compra. Consulta la página de <a href="/envios-y-cambios">Envíos y cambios</a> para conocer las condiciones aplicables.</p>
        </section>

        <section>
          <h2>5. Cambios, retracto y garantía</h2>
          <p>Los cambios comerciales por talla o preferencia se rigen por la política publicada en <a href="/envios-y-cambios">Envíos y cambios</a>. Los derechos legales de retracto, garantía y protección al consumidor se aplicarán en los casos y términos previstos por la legislación colombiana. Ninguna condición de este sitio pretende limitar derechos irrenunciables del consumidor.</p>
        </section>

        <section>
          <h2>6. Uso del sitio</h2>
          <p>Te comprometes a utilizar el sitio de forma lícita, sin afectar su funcionamiento, intentar acceder sin autorización a sus sistemas, introducir código malicioso ni utilizar sus contenidos para actividades fraudulentas.</p>
          <p>Los textos, fotografías, diseños, logotipos, nombres y demás elementos propios de MANTOS están protegidos por las normas aplicables de propiedad intelectual. No está permitida su reproducción o explotación comercial sin autorización previa, salvo los usos permitidos por la ley.</p>
        </section>

        <section>
          <h2>7. Enlaces y servicios de terceros</h2>
          <p>El sitio puede incluir enlaces a plataformas externas, como WhatsApp e Instagram, o utilizar proveedores tecnológicos para alojamiento y analítica. MANTOS no controla las políticas, disponibilidad ni contenidos de esos servicios externos. Su uso se rige también por los términos y políticas de cada proveedor.</p>
        </section>

        <section>
          <h2>8. Protección de datos</h2>
          <p>El tratamiento de los datos personales se rige por nuestra <a href="/privacidad">Política de privacidad</a>, que forma parte de la información aplicable al uso de este sitio y a la gestión de pedidos.</p>
        </section>

        <section>
          <h2>9. Atención al consumidor</h2>
          <p>Para preguntas, solicitudes o reclamaciones relacionadas con una compra, puedes comunicarte con MANTOS por WhatsApp al +57 311 476 9412.</p>
          <a className="legal-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">CONTACTAR A MANTOS <span>↗</span></a>
        </section>

        <section>
          <h2>10. Modificaciones</h2>
          <p>MANTOS podrá actualizar estos términos cuando existan cambios en la operación, los productos o la normativa aplicable. La versión vigente será la publicada en esta página.</p>
          <p><strong>Última actualización:</strong> 24 de noviembre de 2026.</p>
        </section>
      </div>
    </main>
  )
}
