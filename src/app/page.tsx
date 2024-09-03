import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Jogo do Bicho - Sistema de Cadastro</h1>
      <nav>
        <ul>
          <li><Link href="/contraventor">Cadastro de Contraventor</Link></li>
          <li><Link href="/cliente">Cadastro de Cliente</Link></li>
          <li><Link href="/bicho">Cadastro de Bicho</Link></li>
        </ul>
      </nav>
    </div>
  );
}
