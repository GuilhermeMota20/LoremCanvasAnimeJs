import { projectConfig } from '@/app/config/project';
import { HomePage } from '@/pages/Home';

export function App() {
  document.title = projectConfig.productName;
  return <HomePage />;
}
