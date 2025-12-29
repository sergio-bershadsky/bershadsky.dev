import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import BlogPost from "@/pages/blog-post";
import About from "@/pages/about";
import SeriesPage from "@/pages/series";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/about" component={About} />
      <Route path="/series/:slug" component={SeriesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
