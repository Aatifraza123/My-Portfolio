import React from "react";

export function BackendVisual() {
  return (
    <div className="relative h-full w-full bg-[#09090b] p-4 flex flex-col justify-between text-bone font-mono select-none">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <div className="flex items-center gap-2 text-[11px] text-electric font-semibold">
          <span className="h-2 w-2 rounded-full bg-electric animate-pulse" />
          API GATEWAY & BACKEND
        </div>
        <span className="text-[10px] text-bone/40">v2.4.0</span>
      </div>

      <div className="my-auto space-y-2 text-[11px]">
        <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-1.5 border border-white/10">
          <span className="text-emerald-400 font-bold">POST</span>
          <span className="text-bone/80">/api/v1/auth/jwt</span>
          <span className="text-emerald-400 text-[10px]">200 OK</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-1.5 border border-white/10">
          <span className="text-blue-400 font-bold">GET</span>
          <span className="text-bone/80">/api/v1/users/rbac</span>
          <span className="text-blue-400 text-[10px]">14ms</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-1.5 border border-white/10">
          <span className="text-purple-400 font-bold">EXEC</span>
          <span className="text-bone/80">Spring & Express Pool</span>
          <span className="text-purple-400 text-[10px]">Active</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[10px] text-bone/50">
        <span>Linux Service: Running</span>
        <span className="text-electric">99.99% Uptime</span>
      </div>
    </div>
  );
}

export function FrontendVisual() {
  return (
    <div className="relative h-full w-full bg-[#09090b] p-4 flex flex-col justify-between text-bone font-mono select-none">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-semibold">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          REACT & VITE LAYOUT
        </div>
        <span className="text-[10px] text-bone/40">60 FPS</span>
      </div>

      <div className="my-auto grid grid-cols-12 gap-2 text-[10px]">
        <div className="col-span-4 rounded-md border border-cyan-500/30 bg-cyan-500/10 p-2 text-center text-cyan-300">
          State Hooks
        </div>
        <div className="col-span-8 rounded-md border border-electric/30 bg-electric/10 p-2 text-center text-electric">
          Framer Motion Render
        </div>
        <div className="col-span-12 rounded-md border border-white/10 bg-white/5 p-2 flex items-center justify-between text-bone/80">
          <span>Tailwind Engine</span>
          <span className="text-emerald-400">JIT Optimized</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[10px] text-bone/50">
        <span>DOM Tree Nodes: 1,420</span>
        <span className="text-cyan-400">Ultra Crisp UI</span>
      </div>
    </div>
  );
}

export function DatabaseVisual() {
  return (
    <div className="relative h-full w-full bg-[#09090b] p-4 flex flex-col justify-between text-bone font-mono select-none">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <div className="flex items-center gap-2 text-[11px] text-purple-400 font-semibold">
          <span className="h-2 w-2 rounded-full bg-purple-400" />
          MONGO & SQL ARCHITECTURE
        </div>
        <span className="text-[10px] text-bone/40">Indexed</span>
      </div>

      <div className="my-auto space-y-1.5 text-[10px]">
        <div className="rounded-lg bg-white/5 p-2 border border-purple-500/20">
          <div className="text-purple-300 font-bold">table "users" &#123;</div>
          <div className="pl-3 text-bone/70">id: ObjectId [PK], role: Enum</div>
          <div className="text-purple-300 font-bold">&#125;</div>
        </div>
        <div className="flex justify-between items-center px-2 py-1 bg-purple-950/30 border border-purple-800/40 rounded text-purple-200">
          <span>Query Execution Time</span>
          <span className="font-bold text-emerald-400">2.1 ms</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[10px] text-bone/50">
        <span>ACID & Schema Validation</span>
        <span className="text-purple-400">Connected</span>
      </div>
    </div>
  );
}

export function ProgrammingVisual() {
  return (
    <div className="relative h-full w-full bg-[#09090b] p-4 flex flex-col justify-between text-bone font-mono select-none">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <div className="flex items-center gap-2 text-[11px] text-amber-400 font-semibold">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          TYPESCRIPT & JAVA CODE
        </div>
        <span className="text-[10px] text-bone/40">Compiled</span>
      </div>

      <div className="my-auto rounded-lg bg-[#050505] p-2.5 border border-white/10 text-[10px] space-y-1">
        <div><span className="text-purple-400">const</span> <span className="text-blue-300">buildSystem</span> = <span className="text-amber-300">async</span> () =&gt; &#123;</div>
        <div className="pl-3 text-bone/60">// Clean OOP & Functional Logic</div>
        <div className="pl-3"><span className="text-purple-400">return</span> <span className="text-emerald-300">true</span>;</div>
        <div>&#125;;</div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[10px] text-bone/50">
        <span>Strict Mode: Active</span>
        <span className="text-amber-400">0 Type Errors</span>
      </div>
    </div>
  );
}

export function ToolsVisual() {
  return (
    <div className="relative h-full w-full bg-[#09090b] p-4 flex flex-col justify-between text-bone font-mono select-none">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          GIT & LINUX TERMINAL
        </div>
        <span className="text-[10px] text-bone/40">bash</span>
      </div>

      <div className="my-auto space-y-1 text-[10px]">
        <div className="text-bone/60">$ git checkout -b production</div>
        <div className="text-emerald-400">$ systemctl status nginx --active</div>
        <div className="text-bone/80 bg-white/5 p-1.5 rounded border border-white/10">
          ● nginx.service - High Perf Web Server [RUNNING]
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[10px] text-bone/50">
        <span>Postman & Power BI</span>
        <span className="text-emerald-400">Verified</span>
      </div>
    </div>
  );
}

export function CoreCsVisual() {
  return (
    <div className="relative h-full w-full bg-[#09090b] p-4 flex flex-col justify-between text-bone font-mono select-none">
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <div className="flex items-center gap-2 text-[11px] text-rose-400 font-semibold">
          <span className="h-2 w-2 rounded-full bg-rose-400" />
          DATA STRUCTURES & AI/ML
        </div>
        <span className="text-[10px] text-bone/40">O(log N)</span>
      </div>

      <div className="my-auto grid grid-cols-2 gap-2 text-[10px]">
        <div className="rounded bg-white/5 p-2 border border-white/10 text-center">
          <div className="text-rose-300 font-bold">Algorithms</div>
          <div className="text-bone/60 text-[9px]">Graph & Search</div>
        </div>
        <div className="rounded bg-white/5 p-2 border border-white/10 text-center">
          <div className="text-rose-300 font-bold">System Design</div>
          <div className="text-bone/60 text-[9px]">Load Balancing</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[10px] text-bone/50">
        <span>Memory & OS Optimization</span>
        <span className="text-rose-400">Optimal</span>
      </div>
    </div>
  );
}

export function SkillPreviewVisual({ title }: { title: string }) {
  switch (title) {
    case "Backend":
      return <BackendVisual />;
    case "Frontend":
      return <FrontendVisual />;
    case "Database":
      return <DatabaseVisual />;
    case "Programming":
      return <ProgrammingVisual />;
    case "Tools":
      return <ToolsVisual />;
    case "Core CS":
      return <CoreCsVisual />;
    default:
      return <BackendVisual />;
  }
}
