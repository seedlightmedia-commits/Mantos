import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Envíos y cambios',
  description: 'Información sobre entregas, cambios, retracto y garantías de MANTOS.',
}

const WHATSAPP_CHANGE_URL =
  'https://wa.me/573114769412?text=' +
  encodeURIComponent('Hola MANTOS, quisiera hacer un cambio de esta prenda porque: ')

const WHATSAPP_CONTACT_URL =
  'https://wa.me/573114769412?text=' +
  encodeURIComponent('Hola MANTOS, tengo una consulta sobre mi pedido: ')

export default function EnviosYCambiosPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <span className="eyebrow">MANTOS — ATENCIÓN AL CLIENTE</span>
        <h1>ENVÍOS Y CAMBIOS</h1>
        <p>Queremos que recibas tu prenda y la disfrutes como fue pensada.</p>
      </header>

      <div className="legal-content">
        <section>
          <h2>1. Envíos</h2>
          <p>Realizamos envíos dentro de Colombia. El costo y el tiempo estimado de entrega se informarán antes de confirmar el pedido, de acuerdo con la ciudad de destino, la transportadora y la disponibilidad de la prenda.</p>
          <p>Una vez despachado el pedido, compartiremos la información de seguimiento disponible. Los tiempos de entrega son estimados y pueden variar por circunstancias logísticas ajenas a MANTOS.</p>
          <p>Por favor verifica que los datos de contacto y la dirección suministrados estén completos y sean correctos. Si necesitas corregirlos, comunícate con nosotros lo antes posible; después del despacho no siempre será posible modificar la dirección.</p>
        </section>

        <section>
          <h2>2. Cambios por talla o preferencia</h2>
          <p>Como política comercial de MANTOS, puedes solicitar un cambio dentro de los <strong>diez (10) días calendario siguientes a la entrega</strong>, siempre que se cumplan estas condiciones:</p>
          <ul>
            <li>La prenda debe estar sin uso, sin lavar, sin olores, sin manchas y en las mismas condiciones en que fue recibida.</li>
            <li>Debe conservar sus etiquetas, accesorios y empaque, cuando aplique.</li>
            <li>Debes presentar la factura, comprobante o número de pedido que permita verificar la compra.</li>
            <li>El cambio está sujeto a la disponibilidad de la talla o referencia solicitada.</li>
          </ul>
          <p>Para cambios por talla o preferencia, el cliente asume los costos de transporte de ida y regreso. Antes de enviar la prenda, escríbenos por WhatsApp para recibir instrucciones. No envíes productos sin coordinar previamente el proceso.</p>
          <p>Si no hay disponibilidad de la referencia o talla solicitada, te informaremos las alternativas disponibles.</p>
          <a className="legal-cta" href={WHATSAPP_CHANGE_URL} target="_blank" rel="noreferrer">SOLICITAR UN CAMBIO POR WHATSAPP <span>↗</span></a>
        </section>

        <section>
          <h2>3. Derecho de retracto en compras a distancia</h2>
          <p>Independientemente de la política comercial de cambios, cuando la compra se encuentre dentro de los supuestos legales, puedes ejercer el derecho de retracto en los términos del artículo 47 de la Ley 1480 de 2011: dentro de los cinco (5) días hábiles siguientes a la entrega del producto.</p>
          <p>El producto debe devolverse por los mismos medios y en las mismas condiciones en que fue recibido. De acuerdo con la ley, los costos de transporte y los demás asociados a la devolución por retracto están a cargo del consumidor. Cuando proceda, MANTOS realizará la devolución del dinero dentro del plazo legal aplicable al comercio electrónico, una vez se cumplan las condiciones y se reciba la información y el producto requeridos.</p>
          <p>El derecho de retracto tiene excepciones legales, entre ellas los bienes de uso personal y los bienes confeccionados conforme a especificaciones del consumidor o claramente personalizados. La aplicación de una excepción depende de las características concretas del producto y de la operación. Esta información no limita los derechos irrenunciables del consumidor.</p>
        </section>

        <section>
          <h2>4. Garantía y productos con novedades</h2>
          <p>Si recibes una prenda con un defecto de calidad, idoneidad o conformidad, comunícate con nosotros y describe la novedad. Adjunta fotografías o videos y el comprobante de compra para facilitar la revisión.</p>
          <p>Las solicitudes de garantía se tramitarán conforme a la Ley 1480 de 2011 y las normas aplicables. La garantía legal es independiente de los cambios por talla o preferencia y no se limita al plazo comercial de cinco días indicado en esta página.</p>
        </section>

        <section>
          <h2>5. ¿Cómo iniciar una solicitud?</h2>
          <ol>
            <li>Escríbenos al WhatsApp de MANTOS.</li>
            <li>Indica tu nombre, número de pedido, prenda y motivo de la solicitud.</li>
            <li>Adjunta la factura o comprobante de compra y, si aplica, fotografías de la prenda.</li>
            <li>Espera nuestra respuesta con los pasos para continuar.</li>
          </ol>
          <a className="legal-cta" href={WHATSAPP_CONTACT_URL} target="_blank" rel="noreferrer">CONTACTAR A MANTOS <span>↗</span></a>
        </section>

        <p className="legal-note">Esta política comercial no reemplaza ni restringe los derechos que te reconoce la legislación colombiana de protección al consumidor.</p>
      </div>
    </main>
  )
}
