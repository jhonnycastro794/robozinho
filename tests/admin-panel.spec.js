const { test, expect } = require('@playwright/test');

test.describe('Casino Robot Admin Panel', () => {
  
  test.beforeEach(async ({ page }) => {
    // Limpar localStorage antes de cada teste
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('deve exibir página inicial corretamente', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle('Casino Robot - Dev');
    await expect(page.locator('h1')).toContainText('Casino Robot');
    await expect(page.locator('a[href="login.html"]')).toContainText('Acesso ao Painel Admin');
  });

  test('deve realizar login com credenciais válidas', async ({ page }) => {
    await page.goto('/login.html');
    
    await expect(page).toHaveTitle('Login Admin - Casino Robot');
    
    // Preencher formulário de login
    await page.fill('input#username', 'admin');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Verificar redirecionamento para painel admin
    await expect(page).toHaveURL('/admin.html');
    await expect(page).toHaveTitle('Painel Admin - Casino Robot');
    await expect(page.locator('h1')).toContainText('Painel Admin');
  });

  test('deve mostrar erro para credenciais inválidas', async ({ page }) => {
    await page.goto('/login.html');
    
    // Preencher formulário com credenciais inválidas
    await page.fill('input#username', 'wrong');
    await page.fill('input#password', 'wrong');
    await page.click('button[type="submit"]');
    
    // Deve permanecer na página de login
    await expect(page).toHaveURL('/login.html');
    
    // Verificar se mensagem de erro é exibida
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('Usuário ou senha incorretos');
  });

  test('deve proteger acesso direto ao painel admin', async ({ page }) => {
    // Tentar acessar diretamente o painel admin sem login
    await page.goto('/admin.html');
    
    // Deve redirecionar para página de login
    await expect(page).toHaveURL('/login.html');
    await expect(page).toHaveTitle('Login Admin - Casino Robot');
  });

  test('deve adicionar usuários corretamente', async ({ page }) => {
    // Fazer login primeiro
    await page.goto('/login.html');
    await page.fill('input#username', 'admin');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/admin.html');
    
    // Adicionar primeiro usuário
    await page.fill('input#name', 'João Silva');
    await page.fill('input#email', 'joao@example.com');
    await page.click('button[type="submit"]');
    
    // Verificar se usuário foi adicionado à tabela
    await expect(page.locator('#usersTable tbody tr')).toHaveCount(1);
    await expect(page.locator('#usersTable tbody')).toContainText('João Silva');
    await expect(page.locator('#usersTable tbody')).toContainText('joao@example.com');
    
    // Verificar se formulário foi limpo
    await expect(page.locator('input#name')).toHaveValue('');
    await expect(page.locator('input#email')).toHaveValue('');
    
    // Adicionar segundo usuário
    await page.fill('input#name', 'Maria Santos');
    await page.fill('input#email', 'maria@example.com');
    await page.click('button[type="submit"]');
    
    // Verificar se ambos usuários estão na tabela
    await expect(page.locator('#usersTable tbody tr')).toHaveCount(2);
    await expect(page.locator('#usersTable tbody')).toContainText('Maria Santos');
    await expect(page.locator('#usersTable tbody')).toContainText('maria@example.com');
  });

  test('deve persistir sessão após reload da página', async ({ page }) => {
    // Fazer login
    await page.goto('/login.html');
    await page.fill('input#username', 'admin');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/admin.html');
    
    // Recarregar a página
    await page.reload();
    
    // Deve continuar na página admin
    await expect(page).toHaveURL('/admin.html');
    await expect(page.locator('h1')).toContainText('Painel Admin');
  });

  test('deve realizar logout corretamente', async ({ page }) => {
    // Fazer login
    await page.goto('/login.html');
    await page.fill('input#username', 'admin');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/admin.html');
    
    // Fazer logout
    await page.click('button#logoutBtn');
    
    // Deve redirecionar para página de login
    await expect(page).toHaveURL('/login.html');
    
    // Tentar acessar admin novamente deve redirecionar para login
    await page.goto('/admin.html');
    await expect(page).toHaveURL('/login.html');
  });

  test('deve preservar usuários entre sessões', async ({ page }) => {
    // Fazer login e adicionar usuário
    await page.goto('/login.html');
    await page.fill('input#username', 'admin');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    await page.fill('input#name', 'Usuário Teste');
    await page.fill('input#email', 'teste@example.com');
    await page.click('button[type="submit"]');
    
    // Fazer logout
    await page.click('button#logoutBtn');
    
    // Fazer login novamente
    await page.fill('input#username', 'admin');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Verificar se usuário ainda está lá
    await expect(page.locator('#usersTable tbody')).toContainText('Usuário Teste');
    await expect(page.locator('#usersTable tbody')).toContainText('teste@example.com');
  });

  test('não deve aceitar campos vazios no formulário de usuário', async ({ page }) => {
    // Fazer login
    await page.goto('/login.html');
    await page.fill('input#username', 'admin');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Tentar submeter formulário vazio
    await page.click('button[type="submit"]');
    
    // Tabela deve continuar vazia
    await expect(page.locator('#usersTable tbody tr')).toHaveCount(0);
    
    // Tentar com apenas nome preenchido
    await page.fill('input#name', 'Só Nome');
    await page.click('button[type="submit"]');
    
    // Tabela deve continuar vazia
    await expect(page.locator('#usersTable tbody tr')).toHaveCount(0);
  });
});