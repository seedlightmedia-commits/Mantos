import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Política de tratamiento de datos personales de MANTOS.',
}

const WHATSAPP_URL =
  'https://wa.me/573114769412?text=' +
  encodeURIComponent('Hola MANTOS, quiero realizar una consulta sobre mis datos personales.')

export default function PrivacidadPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <span className="eyebrow">MANTOS — INFORMACIÓN LEGAL</span>
        <h1>POLÍTICA DE PRIVACIDAD</h1>
        <p>El cuidado de tu información también hace parte de nuestra forma de hacer las cosas.</p>
      </header>

      <div className="legal-content">
        <section>
          <h2>1. Responsable del tratamiento</h2>
          <p>El responsable del tratamiento de los datos personales recolectados a través de este sitio y de los canales de atención de MANTOS es <strong>[COMPLETAR NOMBRE Y APELLIDOS DE LA PERSONA NATURAL RESPONSABLE]</strong>, quien desarrolla la actividad comercial bajo el nombre MANTOS, en Colombia.</p>
          <p>Canal de contacto para consultas y solicitudes sobre datos personales: WhatsApp <strong>+57 311 476 9412</strong>. Correo electrónico de privacidad: <strong>somosmantos@gmail.com</strong>.</p>
        </section>

        <section>
          <h2>2. Datos que podemos tratar</h2>
          <p>Según la interacción que tengas con MANTOS, podemos tratar datos como:</p>
          <ul>
            <li>Datos de identificación y contacto: nombre, teléfono, correo electrónico y dirección de entrega.</li>
            <li>Información de pedidos: productos, tallas, cantidades, valor, estado del pedido y comprobantes relacionados con la compra.</li>
            <li>Información que decidas compartir al comunicarte con nosotros para resolver dudas, cambios, garantías o solicitudes.</li>
            <li>Información técnica básica de navegación y uso del sitio, que puede incluir datos agregados de analítica y registros técnicos.</li>
          </ul>
          <p>No solicitamos datos sensibles para realizar una compra ordinaria. Evita enviarnos información sensible que no sea necesaria para atender tu solicitud.</p>
        </section>

        <section>
          <h2>3. Finalidades</h2>
          <p>Usamos la información para gestionar pedidos, coordinar entregas, atender pagos por los medios acordados, responder consultas, tramitar cambios y garantías, cumplir obligaciones legales y contables, prevenir fraude, mejorar la experiencia del sitio y mantener la seguridad de nuestros canales.</p>
          <p>Si en el futuro usamos tus datos para enviarte comunicaciones comerciales o promociones, lo haremos respetando las autorizaciones y opciones que exija la normativa aplicable. Puedes solicitar dejar de recibir comunicaciones comerciales.</p>
        </section>

        <section>
          <h2>4. Uso de proveedores y canales externos</h2>
          <p>Para operar el sitio y atender pedidos podemos apoyarnos en proveedores tecnológicos, de alojamiento, analítica, transporte, mensajería y comunicación, incluido WhatsApp. Estos terceros podrán tratar información necesaria para prestar sus servicios, de acuerdo con sus propias condiciones y las instrucciones y obligaciones que correspondan.</p>
          <p>El carrito de esta tienda puede guardar temporalmente los productos seleccionados en el almacenamiento local del navegador para que no se pierdan al navegar. El sitio también utiliza Vercel Analytics en producción para obtener métricas de uso. La información tratada por esos proveedores está sujeta a sus respectivas políticas.</p>
        </section>

        <section>
          <h2>5. Derechos del titular</h2>
          <p>De acuerdo con la Ley 1581 de 2012, puedes conocer, actualizar y rectificar tus datos; solicitar prueba de la autorización cuando sea exigible; conocer el uso que se les ha dado; presentar quejas ante la Superintendencia de Industria y Comercio después de agotar el trámite de consulta o reclamo ante el responsable, cuando corresponda; revocar la autorización y/o solicitar la supresión del dato en los casos previstos por la ley; y acceder gratuitamente a tus datos personales.</p>
        </section>

        <section>
          <h2>6. Consultas y reclamos</h2>
          <p>Puedes presentar una consulta o reclamo escribiendo al WhatsApp +57 311 476 9412 o al correo de privacidad que se indique en esta política. Describe tu solicitud e incluye la información necesaria para identificarte y localizar los datos o la relación comercial. Si actúas mediante representante, podremos solicitar los soportes correspondientes.</p>
          <p>Las consultas y reclamos se atenderán dentro de los términos y procedimientos establecidos en la Ley 1581 de 2012 y sus normas reglamentarias. Si el reclamo está incompleto, podremos solicitar que lo complementes conforme a la ley.</p>
          <a className="legal-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">CONSULTAR SOBRE MIS DATOS <span>↗</span></a>
        </section>

        <section>
          <h2>7. Seguridad y conservación</h2>
          <p>Adoptamos medidas razonables para proteger la información contra pérdida, acceso, uso o divulgación no autorizados. Conservaremos los datos durante el tiempo necesario para cumplir las finalidades informadas, atender obligaciones legales, contables o contractuales y ejercer o defender reclamaciones. Después, se suprimirán o anonimizarán cuando sea procedente.</p>
        </section>

        <section>
          <h2>8. Cambios a esta política</h2>
          <p>Podemos actualizar esta política para reflejar cambios legales, operativos o tecnológicos. Publicaremos la versión vigente en esta página e indicaremos la fecha de actualización.</p>
          <p><strong>Última actualización:</strong> 24 de noviembre de 2026.</p>
        </section>
      </div>
    </main>
  )
}
