import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './pages/login/auth.service';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '',redirectTo: 'login',pathMatch: 'full'},
  { path: 'login',loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'agenda',
     loadChildren: './pages/agenda/agenda.module#AgendaPageModule' ,
     canActivate: [AuthGuard]},//colocar esse AuthGard em todas as rotas para proteger
  { path: 'pagamento', loadChildren: './pages/pagamento/pagamento.module#PagamentoPageModule' },
  { path: 'relatorios', loadChildren: './pages/relatorios/relatorios.module#RelatoriosPageModule' },
  { path: 'cliente', loadChildren: './pages/cadastros/cliente/cliente.module#ClientePageModule' },
  { path: 'cliente/:id', loadChildren: './pages/cadastros/cliente/cliente.module#ClientePageModule' },
  { path: 'convenio', loadChildren: './pages/cadastros/convenio/convenio.module#ConvenioPageModule' },
  { path: 'convenio/:id', loadChildren: './pages/cadastros/convenio/convenio.module#ConvenioPageModule' },
  { path: 'servico', loadChildren: './pages/cadastros/servico/servico.module#ServicosPageModule' },
  { path: 'servico/:id', loadChildren: './pages/cadastros/servico/servico.module#ServicosPageModule' },
  { path: 'pacote', loadChildren: './pages/cadastros/pacote/pacote.module#PacotePageModule' },
  { path: 'pacote/:id', loadChildren: './pages/cadastros/pacote/pacote.module#PacotePageModule' },
  { path: 'clientes', loadChildren: './pages/consultas/clientes/clientes.module#ClientesPageModule' },
  { path: 'convenios', loadChildren: './pages/consultas/convenios/convenios.module#ConveniosPageModule' },
  { path: 'servicos', loadChildren: './pages/consultas/servicos/servicos.module#ServicosPageModule' },
  { path: 'pacotes', loadChildren: './pages/consultas/pacotes/pacotes.module#PacotesPageModule' },
  { path: 'profissional', loadChildren: './pages/cadastros/profissional/profissional.module#ProfissionalPageModule' },
  { path: 'profissionais', loadChildren: './pages/consultas/profissionais/profissionais.module#ProfissionaisPageModule' },
  { path: 'profissional/:id', loadChildren: './pages/cadastros/profissional/profissional.module#ProfissionalPageModule' },
]; 

@NgModule({
  imports: [
    
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
