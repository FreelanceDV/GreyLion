'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { upload } from '@vercel/blob/client';

interface MediaAsset {
  id: string;
  name: string;
  description: string;
  path: string;
  type: 'image' | 'video';
  recommendedSize: string;
  isScanned?: boolean;
  relativePath?: string;
  line?: number;
}

const MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'hero_ship',
    name: 'Imagen o Video del Hero (Barco)',
    description: 'Se utiliza como fondo en el costado derecho de la sección de presentación principal.',
    path: '/hero_ship_oceanis.[ext]',
    type: 'image',
    recommendedSize: 'Cualquier Foto, GIF o Video (Límite 4.5MB)'
  },
  {
    id: 'maritime_transport',
    name: 'Multimedia: Transporte Marítimo',
    description: 'Se utiliza de fondo y en el costado derecho de la tarjeta expandida de Transporte Marítimo.',
    path: '/maritime_transport_card.[ext]',
    type: 'image',
    recommendedSize: 'Cualquier Foto, GIF o Video (Límite 4.5MB)'
  },
  {
    id: 'integral_logistics',
    name: 'Multimedia: Logística Integral',
    description: 'Se utiliza de fondo y en el costado derecho de la tarjeta expandida de Logística Integral.',
    path: '/integral_logistics_card.[ext]',
    type: 'image',
    recommendedSize: 'Cualquier Foto, GIF o Video (Límite 4.5MB)'
  },
  {
    id: 'bg_about',
    name: 'Fondo Sección: Sobre la Empresa',
    description: 'Fondo opcional (video o imagen) para la sección "Quiénes Somos / Sobre la Empresa".',
    path: '/bg_about.[ext]',
    type: 'video',
    recommendedSize: 'Foto, GIF o Video (Límite 4.5MB)'
  },
  {
    id: 'bg_comparison',
    name: 'Fondo Sección: Comparativa de Servicios',
    description: 'Fondo opcional (video o imagen) para la sección de tabla comparativa y logística.',
    path: '/bg_comparison.[ext]',
    type: 'video',
    recommendedSize: 'Foto, GIF o Video (Límite 4.5MB)'
  },
  {
    id: 'bg_cta',
    name: 'Fondo Sección: Llamado a la Acción (CTA)',
    description: 'Fondo opcional (video o imagen) para el banner de contacto inferior.',
    path: '/bg_cta.[ext]',
    type: 'video',
    recommendedSize: 'Foto, GIF o Video (Límite 4.5MB)'
  }
];

// Client-side image compressor using HTML5 Canvas
const compressImage = (file: File, quality = 0.75): Promise<File> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Downscale if extremely large (e.g. 4K) to optimize bandwidth/storage
        const MAX_WIDTH = 2560;
        const MAX_HEIGHT = 1440;
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width / height > MAX_WIDTH / MAX_HEIGHT) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            // Preserve the original name but replace extension with .webp
            const originalName = file.name.substring(0, file.name.lastIndexOf('.'));
            const compressedFile = new File([blob], `${originalName}.webp`, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/webp',
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  // Scanning states
  const [scannedAssets, setScannedAssets] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [activeTab, setActiveTab] = useState<'scanned' | 'system'>('scanned');

  // Uploading states
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Link upload / URL states
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [mediaUrlInput, setMediaUrlInput] = useState('');
  const [copiedError, setCopiedError] = useState(false);

  const [config, setConfig] = useState<Record<string, string>>({});

  const loadConfig = async () => {
    try {
      const blobConfigUrl = 'https://77ydstadplufv4mf.public.blob.vercel-storage.com/media_config.json?t=' + Date.now();
      const res = await fetch(blobConfigUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error('Blob config not found');
      const data = await res.json();
      setConfig(data);
    } catch (err) {
      try {
        const res = await fetch('/media_config.json');
        if (res.ok) {
          const data = await res.json();
          setConfig(data);
        }
      } catch (localErr) {
        console.error('Failed to load media config:', localErr);
      }
    }
  };

  const handleScan = async (silent = false) => {
    if (!silent) setIsScanning(true);
    try {
      const res = await fetch('/api/admin/scan');
      const data = await res.json();
      if (data.success) {
        setScannedAssets(data.assets);
      } else {
        console.error('Failed to scan landing page assets:', data.error);
      }
    } catch (err) {
      console.error('Failed to scan landing page assets:', err);
    } finally {
      if (!silent) setIsScanning(false);
    }
  };

  // Authenticate locally using sessionStorage
  useEffect(() => {
    const token = sessionStorage.getItem('greylion_admin_token');
    const pass = sessionStorage.getItem('greylion_admin_pass');
    if (token === 'authenticated') {
      setIsAuthenticated(true);
      if (pass) setPassword(pass);
      loadConfig();
      handleScan(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok && data.authenticated) {
        sessionStorage.setItem('greylion_admin_token', 'authenticated');
        sessionStorage.setItem('greylion_admin_pass', password);
        setIsAuthenticated(true);
        setLoginError('');
        loadConfig();
        handleScan(false);
      } else {
        setLoginError(data.error || 'Contraseña incorrecta. Por favor, intente de nuevo.');
      }
    } catch (err) {
      setLoginError('Error de conexión con el servidor de autenticación.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('greylion_admin_token');
    sessionStorage.removeItem('greylion_admin_pass');
    setIsAuthenticated(false);
    setPassword('');
    setSelectedAsset(null);
    resetUpload();
  };

  const selectAsset = (asset: MediaAsset) => {
    setSelectedAsset(asset);
    resetUpload();
  };

  const resetUpload = () => {
    setUploadFile(null);
    setPreviewUrl(null);
    setMediaUrlInput('');
    setUploadSuccess(false);
    setLogMessages([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Accept any image or video file type globally
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      alert('Por favor seleccione un archivo multimedia válido (imagen, gif o video).');
      return;
    }

    // Check file size (Vercel Blob Hobby plan limit is 500MB)
    const MAX_SIZE = 500 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert(`El archivo es demasiado grande (${(file.size / 1024 / 1024).toFixed(2)}MB). El límite de carga es de 500MB.`);
      return;
    }

    // Handle Client-Side Image Compression if file exceeds 5MB
    if (file.type.startsWith('image/') && file.size > 5 * 1024 * 1024) {
      setLogMessages([
        `⚙️ Compresión Automática: El archivo pesa ${(file.size / 1024 / 1024).toFixed(2)} MB (> 5MB).`,
        `Comprimiendo imagen a WebP para ahorrar espacio en la nube...`
      ]);
      try {
        const compressed = await compressImage(file, 0.75);
        setLogMessages(prev => [
          ...prev,
          `✅ Compresión completada exitosamente.`,
          `Tamaño original: ${(file.size / 1024 / 1024).toFixed(2)} MB`,
          `Nuevo tamaño: ${(compressed.size / 1024 / 1024).toFixed(2)} MB (Ahorro: ${((1 - compressed.size / file.size) * 100).toFixed(0)}%)`
        ]);
        setUploadFile(compressed);
        const objectUrl = URL.createObjectURL(compressed);
        setPreviewUrl(objectUrl);
      } catch (err) {
        console.error('Compression failed:', err);
        setUploadFile(file);
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      }
    } else {
      // Suggest video optimization if video is larger than 5MB
      if (file.type.startsWith('video/') && file.size > 5 * 1024 * 1024) {
        setLogMessages([
          `⚠️ Nota: El video pesa ${(file.size / 1024 / 1024).toFixed(2)} MB (> 5MB).`,
          `Los videos no se pueden comprimir directamente en el navegador.`,
          `Se recomienda optimizar/comprimir el video localmente antes de subirlo para ahorrar espacio en el blob.`
        ]);
      }
      setUploadFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSave = async () => {
    if (!selectedAsset) return;
    if (uploadMode === 'file' && !uploadFile) return;
    if (uploadMode === 'url' && !mediaUrlInput) return;

    setIsUploading(true);
    setUploadSuccess(false);

    if (uploadMode === 'file' && uploadFile) {
      setLogMessages(prev => [
        ...prev,
        '[1/3] Preparando el archivo para subir...', 
        `Sección/Recurso: ${selectedAsset.name}`, 
        `Nombre del archivo: ${uploadFile.name}`,
        `Tamaño: ${(uploadFile.size / 1024 / 1024).toFixed(2)} MB`
      ]);
    } else {
      setLogMessages(['[1/3] Registrando enlace externo...', `Sección: ${selectedAsset.name}`, `Enlace: ${mediaUrlInput}`]);
    }

    try {
      let uploadUrl = '';

      // Direct client-side upload to Vercel Blob if file is larger than 4.5MB
      if (uploadMode === 'file' && uploadFile && uploadFile.size > 4.5 * 1024 * 1024) {
        setLogMessages(prev => [...prev, '[2/3] El archivo es grande. Subiendo directamente a internet...']);
        try {
          const fileExtension = uploadFile.name.substring(uploadFile.name.lastIndexOf('.'));
          // Create safe unique ID for Vercel Blob
          const sanitizedId = selectedAsset.id.replace(/[^a-zA-Z0-9]/g, '_').replace(/^_+|_+$/g, '').toLowerCase();
          const fixedFileName = `${sanitizedId}${fileExtension}`;

          const blob = await upload(fixedFileName, uploadFile, {
            access: 'public',
            handleUploadUrl: '/api/admin/media/upload',
            clientPayload: JSON.stringify({ password }),
          });
          uploadUrl = blob.url;
          setLogMessages(prev => [
            ...prev, 
            `✅ Archivo subido exitosamente a internet.`,
            '[2/3] Registrando la nueva dirección del archivo...'
          ]);
        } catch (blobErr: any) {
          throw new Error(`Error de conexión con el almacenamiento en internet: ${blobErr.message}. Asegúrese de tener configuradas las credenciales de almacenamiento en el servidor.`);
        }
      }

      const formData = new FormData();
      formData.append('password', password);
      formData.append('assetId', selectedAsset.id);
      
      if (uploadUrl) {
        // If uploaded to Vercel Blob, save the URL reference
        formData.append('url', uploadUrl);
      } else if (uploadMode === 'file' && uploadFile) {
        formData.append('file', uploadFile); 
      } else {
        formData.append('url', mediaUrlInput);
      }

      setLogMessages(prev => [...prev, '[2/3] Sincronizando y guardando cambios en el servidor...']);
      
      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseErr) {
        throw new Error(responseText || `Error ${response.status}: ${response.statusText}`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al guardar el recurso.');
      }

      setLogMessages(prev => [
        ...prev,
        uploadMode === 'file' 
          ? '[3/3] ¡Archivo guardado y configurado con éxito!'
          : '[3/3] ¡Enlace externo guardado con éxito!',
        `Estado: ${data.syncStatus || 'Completado.'}`,
        '¡Todo listo! Los cambios se verán en la página web en unos instantes.'
      ]);
      setUploadSuccess(true);
      loadConfig();
      handleScan(true);
      
    } catch (err: any) {
      setLogMessages(prev => [...prev, `❌ ERROR: ${err.message || 'Error de conexión'}`]);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyError = () => {
    const errorText = logMessages.join('\n');
    navigator.clipboard.writeText(errorText);
    setCopiedError(true);
    setTimeout(() => setCopiedError(false), 4000);
  };

  const handleResetToDefault = async () => {
    if (!selectedAsset) return;
    
    const defaultPaths: Record<string, string> = {
      hero_ship: '/hero_ship_oceanis.jpg',
      maritime_transport: '/maritime_transport_card.jpg',
      integral_logistics: '/integral_logistics_card.jpg',
      bg_about: '/charger_boat.mp4',
      bg_comparison: '/charger_boat.mp4',
      bg_cta: '/charger_boat.mp4',
    };
    
    const defaultPath = defaultPaths[selectedAsset.id] || selectedAsset.path;
    if (!defaultPath) return;
    
    const confirmReset = window.confirm(`¿Está seguro de que desea restablecer el recurso "${selectedAsset.name}" a su archivo por defecto?`);
    if (!confirmReset) return;
    
    setIsUploading(true);
    setUploadSuccess(false);
    setLogMessages(['[1/3] Solicitando restablecer recurso...', `Recurso: ${selectedAsset.name}`, `Archivo por defecto: ${defaultPath}`]);
    
    const formData = new FormData();
    formData.append('password', password);
    formData.append('assetId', selectedAsset.id);
    formData.append('url', defaultPath);

    try {
      setLogMessages(prev => [...prev, '[2/3] Sincronizando cambios en el servidor...']);

      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseErr) {
        throw new Error(responseText || `Error ${response.status}: ${response.statusText}`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al guardar el recurso.');
      }

      setLogMessages(prev => [
        ...prev,
        '[3/3] ¡Recurso restablecido con éxito!',
        `Estado: ${data.syncStatus || 'Completado.'}`,
        'Los cambios ya están visibles en la página web principal.'
      ]);
      setUploadSuccess(true);
      loadConfig();
      handleScan(true);

    } catch (err: any) {
      setLogMessages(prev => [...prev, `❌ ERROR: ${err.message || 'Error de conexión'}`]);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDisableAsset = async () => {
    if (!selectedAsset) return;
    
    const confirmDisable = window.confirm(`¿Está seguro de que desea desactivar u ocultar el recurso "${selectedAsset.name}"? En la página web se mostrará un fondo oscuro sólido o no se mostrará nada.`);
    if (!confirmDisable) return;
    
    setIsUploading(true);
    setUploadSuccess(false);
    setLogMessages(['[1/3] Solicitando desactivar recurso...', `Recurso: ${selectedAsset.name}`]);
    
    const formData = new FormData();
    formData.append('password', password);
    formData.append('assetId', selectedAsset.id);
    formData.append('url', 'none');
    
    try {
      setLogMessages(prev => [...prev, '[2/3] Sincronizando cambios en el servidor...']);

      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseErr) {
        throw new Error(responseText || `Error ${response.status}: ${response.statusText}`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al guardar el recurso.');
      }

      setLogMessages(prev => [
        ...prev,
        '[3/3] ¡Recurso desactivado con éxito!',
        `Estado: ${data.syncStatus || 'Completado.'}`,
        'El recurso se ha ocultado de la página web.'
      ]);
      setUploadSuccess(true);
      loadConfig();
      handleScan(true);

    } catch (err: any) {
      setLogMessages(prev => [...prev, `❌ ERROR: ${err.message || 'Error de conexión'}`]);
    } finally {
      setIsUploading(false);
    }
  };

  // Group scanned assets by their component/file relative path
  const getGroupedScannedAssets = () => {
    const filtered = scannedAssets.filter(asset => {
      // 1. Search Query filter
      const matchesSearch = asset.originalPath.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            asset.relativePath.toLowerCase().includes(searchQuery.toLowerCase());
      // 2. Type filter
      const matchesType = typeFilter === 'all' || asset.type === typeFilter;
      
      return matchesSearch && matchesType;
    });

    // Group by relativePath
    const groups: Record<string, typeof scannedAssets> = {};
    filtered.forEach(asset => {
      if (!groups[asset.relativePath]) {
        groups[asset.relativePath] = [];
      }
      groups[asset.relativePath].push(asset);
    });

    return groups;
  };

  // ---------------- RENDER LOGIN SCREEN ----------------
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#070b12] text-white font-[family-name:var(--font-inter)] p-5">
        <div className="w-full max-w-[420px] bg-[rgba(18,20,23,0.85)] border border-[rgba(255,255,255,0.08)] rounded-[20px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-[16px] flex flex-col gap-7">
          <div className="text-center">
            <span className="text-4xl text-[#00a3ff]">⚓</span>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[22px] font-extrabold mt-3 tracking-[1.5px]">GREYLION MARITIME</h2>
            <p className="text-[13px] text-white/40 mt-1">Gestor de Recursos Multimedia</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="admin-pass" className="text-xs font-semibold text-white/60 uppercase tracking-[0.05em]">Contraseña Administrativa</label>
              <input
                id="admin-pass"
                type="password"
                placeholder="Ingrese la contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg p-3.5 text-white text-[15px] outline-none transition-colors duration-300 ease-[ease] focus:border-[#00a3ff]"
              />
            </div>

            {loginError && <p className="text-[13px] text-[#ff3b30] text-center">{loginError}</p>}

            <button type="submit" className="bg-[#0070f3] text-white border-0 rounded-lg p-3.5 text-[15px] font-bold cursor-pointer transition-all duration-300 ease-[ease] shadow-[0_4px_14px_rgba(0,112,243,0.3)] hover:bg-[#005ccb] hover:-translate-y-0.5">Acceder al Panel</button>
          </form>

          <Link href="/" className="text-center text-[13px] text-white/40 no-underline transition-colors duration-300 ease-[ease] hover:text-white">← Volver a la Landing</Link>
        </div>
      </main>
    );
  }

  const groupedScanned = getGroupedScannedAssets();

  // ---------------- RENDER MAIN ADMIN DASHBOARD ----------------
  return (
    <main className="min-h-screen bg-[#070b12] text-white font-[family-name:var(--font-inter)] pb-20">
      {/* Top Header */}
      <header className="bg-[#0d1118] border-b border-[rgba(255,255,255,0.08)] py-5 sticky top-0 z-40">
        <div className="w-full max-w-[1280px] mx-auto px-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-[#00a3ff]">⚓</span>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-lg font-extrabold tracking-[1px]">GREYLION GESTOR</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[13px] font-semibold text-white/70 no-underline py-2 px-4 rounded-md border border-[rgba(255,255,255,0.1)] transition-all duration-200 ease-[ease] hover:text-white hover:border-white">Ver Landing Page</Link>
            <button onClick={handleLogout} className="text-[13px] font-semibold text-[#ff3b30] bg-transparent border border-[rgba(255,59,48,0.2)] py-2 px-4 rounded-md cursor-pointer transition-all duration-200 ease-[ease] hover:bg-[rgba(255,59,48,0.1)] hover:border-[#ff3b30]">Cerrar Sesión</button>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="w-full max-w-[1280px] mx-auto px-5 mt-10">
        <div className="grid grid-cols-[1.2fr_1.4fr] gap-10 max-[991px]:grid-cols-1 max-[991px]:gap-8">

          {/* Left Panel: List of Assets */}
          <div className="bg-[rgba(13,17,24,0.6)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 flex flex-col gap-5">
            
            {/* Panel Header */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-extrabold">Recursos de la Landing</h2>
                <button 
                  onClick={() => handleScan(false)} 
                  disabled={isScanning}
                  className="text-xs bg-[#0070f3] text-white py-1.5 px-3 rounded-lg border-0 cursor-pointer font-bold transition-all hover:bg-[#005ccb] disabled:opacity-50"
                >
                  {isScanning ? 'Escaneando...' : '🔍 Escanear Código'}
                </button>
              </div>
              <p className="text-[13px] text-white/40">Gestiona imágenes y videos detectados en el código de la landing page.</p>
            </div>

            {/* Tabs Selector */}
            <div className="flex border-b border-[rgba(255,255,255,0.08)]">
              <button 
                onClick={() => { setActiveTab('scanned'); setSelectedAsset(null); }}
                className={`py-2 px-4 font-bold text-sm border-b-2 cursor-pointer transition-all ${
                  activeTab === 'scanned' ? 'border-[#00a3ff] text-white' : 'border-transparent text-white/40 hover:text-white'
                }`}
              >
                Escáner Landing ({scannedAssets.length})
              </button>
              <button 
                onClick={() => { setActiveTab('system'); setSelectedAsset(null); }}
                className={`py-2 px-4 font-bold text-sm border-b-2 cursor-pointer transition-all ${
                  activeTab === 'system' ? 'border-[#00a3ff] text-white' : 'border-transparent text-white/40 hover:text-white'
                }`}
              >
                Secciones Clave ({MEDIA_ASSETS.length})
              </button>
            </div>

            {/* Filter and Search Bar for Scanned Assets */}
            {activeTab === 'scanned' && (
              <div className="flex flex-col gap-3">
                <input 
                  type="text" 
                  placeholder="Buscar recursos por ruta o componente..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-lg p-2.5 text-white text-xs outline-none focus:border-[#00a3ff]"
                />
                <div className="flex gap-2">
                  <button 
                    onClick={() => setTypeFilter('all')}
                    className={`py-1 px-3 rounded-md text-[11px] font-bold border cursor-pointer ${
                      typeFilter === 'all' ? 'bg-[rgba(0,163,255,0.08)] border-[#00a3ff] text-[#00a3ff]' : 'border-[rgba(255,255,255,0.08)] text-white/50'
                    }`}
                  >
                    Todos
                  </button>
                  <button 
                    onClick={() => setTypeFilter('image')}
                    className={`py-1 px-3 rounded-md text-[11px] font-bold border cursor-pointer ${
                      typeFilter === 'image' ? 'bg-[rgba(0,163,255,0.08)] border-[#00a3ff] text-[#00a3ff]' : 'border-[rgba(255,255,255,0.08)] text-white/50'
                    }`}
                  >
                    🖼️ Imágenes
                  </button>
                  <button 
                    onClick={() => setTypeFilter('video')}
                    className={`py-1 px-3 rounded-md text-[11px] font-bold border cursor-pointer ${
                      typeFilter === 'video' ? 'bg-[rgba(0,163,255,0.08)] border-[#00a3ff] text-[#00a3ff]' : 'border-[rgba(255,255,255,0.08)] text-white/50'
                    }`}
                  >
                    🎥 Videos
                  </button>
                </div>
              </div>
            )}

            {/* List Content */}
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-1">
              {activeTab === 'system' ? (
                // SYSTEM ASSETS LIST
                MEDIA_ASSETS.map((asset) => {
                  const isSelected = selectedAsset?.id === asset.id;
                  const currentOverride = config[asset.id];
                  const hasOverride = currentOverride && currentOverride !== 'none' && currentOverride !== asset.path;
                  return (
                    <button
                      key={asset.id}
                      className={`w-full text-left rounded-xl p-4 cursor-pointer transition-all duration-300 ease-[ease] flex flex-col gap-1.5 outline-none border ${
                        isSelected
                          ? 'bg-[rgba(0,163,255,0.05)] border-[#00a3ff]'
                          : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.15)]'
                      }`}
                      onClick={() => selectAsset(asset)}
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="text-[9px] font-extrabold text-[#00a3ff] tracking-[0.1em] bg-[rgba(0,163,255,0.1)] py-0.5 px-1.5 rounded">{asset.type.toUpperCase()}</div>
                        {hasOverride && <span className="text-[9px] text-[#f59e0b] font-bold">☁️ Modificado (Nube)</span>}
                      </div>
                      <h3 className="text-[14px] font-bold text-white">{asset.name}</h3>
                      <p className="text-xs text-white/50 leading-[1.4]">{asset.description}</p>
                      <div className="text-[10px] text-white/30 mt-1">
                        <span>Por defecto: <code className="bg-black/20 py-0.5 px-1.5 rounded">{asset.path}</code></span>
                      </div>
                    </button>
                  );
                })
              ) : (
                // SCANNED ASSETS LIST
                Object.keys(groupedScanned).length === 0 ? (
                  <p className="text-xs text-white/40 text-center py-10">No se encontraron elementos multimedia que coincidan con la búsqueda.</p>
                ) : (
                  Object.keys(groupedScanned).map((filePath) => (
                    <div key={filePath} className="flex flex-col gap-2">
                      <div className="text-xs font-extrabold text-white/60 tracking-[0.05em] border-b border-[rgba(255,255,255,0.05)] pb-1 mt-2">
                        📄 {filePath.split('/').pop()} <span className="text-[10px] font-normal text-white/35">({filePath})</span>
                      </div>
                      <div className="flex flex-col gap-2 pl-2">
                        {groupedScanned[filePath].map((asset: any, idx: number) => {
                          const assetKey = asset.originalPath;
                          const isSelected = selectedAsset?.id === assetKey;
                          
                          const currentOverride = config[assetKey];
                          const isOverwritten = currentOverride && currentOverride !== 'none' && currentOverride !== assetKey;
                          const isOculto = currentOverride === 'none';

                          const displayTitle = asset.isAssetId 
                            ? `DynamicMedia Key: "${asset.originalPath}"`
                            : asset.originalPath;

                          const mediaAsset: MediaAsset = {
                            id: assetKey,
                            name: displayTitle,
                            description: `Detectado en el código: ${filePath} (Línea ${asset.line})`,
                            path: assetKey,
                            type: asset.type,
                            recommendedSize: asset.type === 'video' ? 'Cualquier Video MP4' : 'Cualquier Foto o WebP',
                            isScanned: true,
                            relativePath: asset.relativePath,
                            line: asset.line,
                          };

                          return (
                            <button
                              key={idx}
                              className={`w-full text-left rounded-lg p-3 cursor-pointer transition-all duration-200 flex flex-col gap-1 outline-none border ${
                                isSelected
                                  ? 'bg-[rgba(0,163,255,0.05)] border-[#00a3ff]'
                                  : 'bg-[rgba(255,255,255,0.01)] border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.1)]'
                              }`}
                              onClick={() => selectAsset(mediaAsset)}
                            >
                              <div className="flex justify-between items-center w-full">
                                <span className="text-[8px] font-extrabold uppercase bg-white/10 px-1.5 py-0.5 rounded text-white/70">
                                  {asset.type === 'video' ? '🎥 VIDEO' : '🖼️ IMAGEN'}
                                </span>
                                {isOculto ? (
                                  <span className="text-[9px] text-[#ef4444] font-bold">🚫 Oculto</span>
                                ) : isOverwritten ? (
                                  <span className="text-[9px] text-[#00a3ff] font-bold">☁️ Editado</span>
                                ) : (
                                  <span className="text-[9px] text-white/30 font-bold">Original</span>
                                )}
                              </div>
                              <code className="text-xs text-white break-all bg-black/10 p-1 rounded font-mono leading-tight">{displayTitle}</code>
                              <span className="text-[10px] text-white/40">Línea {asset.line} &bull; <span className="font-mono text-[9px]">{asset.context.length > 50 ? asset.context.substring(0, 50) + '...' : asset.context}</span></span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          </div>

          {/* Right Panel: Editor / Dropzone */}
          <div className="min-h-[500px]">
            {selectedAsset ? (
              <div className="bg-[#0d1118] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 flex flex-col gap-6">
                <div className="flex justify-between items-start gap-5">
                  <div className="flex-1">
                    <span className="text-[11px] font-extrabold text-[#00a3ff] uppercase tracking-[0.1em]">
                      {selectedAsset.isScanned ? 'Recurso Escaneado' : 'Editor de Recurso'}
                    </span>
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-extrabold mt-1 break-all font-mono bg-black/10 p-1.5 rounded">{selectedAsset.name}</h2>
                    <p className="text-xs text-white/50 leading-[1.5] mt-2">{selectedAsset.description}</p>
                    <p className="text-[13px] text-[#ffb800] mt-1.5 bg-[rgba(255,184,0,0.08)] border border-[rgba(255,184,0,0.2)] py-2.5 px-3.5 rounded-lg">
                      <strong>Recomendación:</strong> {selectedAsset.recommendedSize}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={handleResetToDefault}
                      disabled={isUploading}
                      className="flex items-center gap-1.5 py-2 px-3.5 rounded-lg border border-[rgba(255,68,68,0.25)] bg-[rgba(255,68,68,0.05)] text-[#ff6b6b] text-xs font-semibold cursor-pointer transition-all duration-300 ease-[ease] hover:not-disabled:bg-[rgba(255,68,68,0.12)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      🔄 Restablecer
                    </button>
                    <button
                      onClick={handleDisableAsset}
                      disabled={isUploading}
                      className="flex items-center gap-1.5 py-2 px-3.5 rounded-lg border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.03)] text-[#ffc107] text-xs font-semibold cursor-pointer transition-all duration-300 ease-[ease] hover:not-disabled:bg-[rgba(255,255,255,0.08)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      🚫 Ocultar / Apagar
                    </button>
                  </div>
                </div>

                {/* Preview of Currently Active Resource */}
                <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 mb-1">
                  <h4 className="text-xs text-white/50 m-0 mb-3 uppercase tracking-[0.05em] font-bold">
                    🔍 Recurso Actual en Uso (Página Web)
                  </h4>
                  {(() => {
                    const currentUrl = config[selectedAsset.id] || '';
                    const isDisabled = currentUrl === 'none';
                    const isDefault = !currentUrl || currentUrl === selectedAsset.path || currentUrl === selectedAsset.id;
                    const displayUrl = currentUrl || selectedAsset.path.replace('[ext]', selectedAsset.type === 'video' ? 'mp4' : 'jpg');

                    // Simple check if it is a video file
                    const cleanUrl = displayUrl.split('?')[0].toLowerCase();
                    const isVideo = !isDisabled && (cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.mov') || cleanUrl.endsWith('.webm') || cleanUrl.endsWith('.ogg'));

                    return (
                      <div className="flex flex-col gap-2.5">
                        <div className="relative w-full h-40 rounded-lg overflow-hidden bg-[#070b12] flex items-center justify-center border border-[rgba(255,255,255,0.03)]">
                          {isDisabled ? (
                            <div className="text-center p-5 text-white/40">
                              <span className="text-2xl block mb-2">🚫</span>
                              <strong className="text-[13px] block text-white/60">Recurso Apagado / Oculto</strong>
                              <span className="text-[11px] text-white/30 block mt-1">Se mostrará un fondo oscuro sólido o transparente en la página.</span>
                            </div>
                          ) : isVideo ? (
                            <video src={displayUrl} controls muted className="max-w-full max-h-40" />
                          ) : (
                            <img src={displayUrl} alt="Vista actual" className="max-w-full max-h-40 object-contain" />
                          )}
                        </div>
                        <div className="flex justify-between items-center text-[11.5px]">
                          <span className="text-white/50">
                            Origen:{' '}
                            <strong className={isDisabled ? 'text-[#ef4444]' : isDefault ? 'text-[#f59e0b]' : 'text-[#3b82f6]'}>
                              {isDisabled ? 'Apagado / Oculto' : isDefault ? 'Por defecto (Local)' : 'Nube (Blob Store)'}
                            </strong>
                          </span>
                          {!isDefault && !isDisabled && (
                            <a
                              href={displayUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#00a3ff] no-underline font-semibold"
                            >
                              Abrir archivo original ↗
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Upload Action Area */}
                <div>
                  {/* Mode selector */}
                  <div className="flex gap-3 mb-5">
                    <button
                      onClick={() => { setUploadMode('file'); resetUpload(); }}
                      className={`py-2 px-4 rounded-lg border font-semibold cursor-pointer transition-all duration-300 ease-[ease] ${
                        uploadMode === 'file'
                          ? 'border-[#00a3ff] bg-[rgba(0,163,255,0.08)] text-[#00a3ff]'
                          : 'border-[rgba(255,255,255,0.08)] bg-transparent text-white/50'
                      }`}
                    >
                      📁 Archivo Local
                    </button>
                    <button
                      onClick={() => { setUploadMode('url'); resetUpload(); }}
                      className={`py-2 px-4 rounded-lg border font-semibold cursor-pointer transition-all duration-300 ease-[ease] ${
                        uploadMode === 'url'
                          ? 'border-[#00a3ff] bg-[rgba(0,163,255,0.08)] text-[#00a3ff]'
                          : 'border-[rgba(255,255,255,0.08)] bg-transparent text-white/50'
                      }`}
                    >
                      🔗 Enlace / URL
                    </button>
                  </div>

                  {uploadMode === 'file' ? (
                    <div className="relative border-2 border-dashed border-[rgba(255,255,255,0.12)] rounded-xl p-10 text-center cursor-pointer bg-[rgba(255,255,255,0.01)] transition-all duration-300 ease-[ease] hover:border-[#00a3ff] hover:bg-[rgba(0,163,255,0.02)]" onClick={() => fileInputRef.current?.click()}>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                      />

                      {previewUrl && uploadFile ? (
                        <div className="relative flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
                          {uploadFile.type.startsWith('video/') ? (
                            <video src={previewUrl} controls className="max-h-[240px] max-w-full rounded-lg object-contain border border-[rgba(255,255,255,0.08)]" />
                          ) : (
                            <img src={previewUrl} alt="Vista previa" className="max-h-[240px] max-w-full rounded-lg object-contain border border-[rgba(255,255,255,0.08)]" />
                          )}
                          <button onClick={resetUpload} className="bg-[rgba(255,255,255,0.08)] text-white border border-[rgba(255,255,255,0.15)] rounded-md py-2 px-4 text-xs font-semibold cursor-pointer transition-colors duration-200 ease-[ease] hover:bg-[rgba(255,255,255,0.15)]">Cambiar Archivo</button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <span className="text-[32px] text-white/30">⬆</span>
                          <p className="text-[15px] font-bold">Haga clic para subir un archivo nuevo</p>
                          <p className="text-xs text-white/40">
                            Cualquier imagen, GIF o video (.jpg, .png, .webp, .gif, .mp4, .mov)
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5 w-full">
                      {previewUrl ? (
                        <div className="relative w-full flex flex-col items-center gap-4">
                          {(previewUrl.toLowerCase().split('?')[0].endsWith('.mp4') ||
                            previewUrl.toLowerCase().split('?')[0].endsWith('.mov') ||
                            previewUrl.toLowerCase().split('?')[0].endsWith('.webm')) ? (
                            <video src={previewUrl} controls className="max-w-full max-h-[240px] rounded-lg" />
                          ) : (
                            <img src={previewUrl} alt="Vista previa" className="max-w-full max-h-[240px] rounded-lg object-contain" />
                          )}
                          <button onClick={resetUpload} className="mt-3 bg-[rgba(255,255,255,0.08)] text-white border border-[rgba(255,255,255,0.15)] rounded-md py-2 px-4 text-xs font-semibold cursor-pointer transition-colors duration-200 ease-[ease] hover:bg-[rgba(255,255,255,0.15)]">Limpiar Enlace</button>
                        </div>
                      ) : (
                        <div className="bg-[rgba(255,255,255,0.01)] border border-dashed border-[rgba(255,255,255,0.15)] rounded-2xl p-10 flex flex-col gap-4 w-full">
                          <label className="text-sm font-semibold text-white/80">
                            Pegue el enlace directo de la imagen, gif o video:
                          </label>
                          <input
                            type="url"
                            placeholder="https://ejemplo.com/mi-video-pesado.mp4"
                            value={mediaUrlInput}
                            onChange={(e) => {
                              const val = e.target.value;
                              setMediaUrlInput(val);
                              setPreviewUrl(val || null);
                            }}
                            className="w-full py-3.5 px-4 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0a0b0d] text-white text-sm outline-none"
                          />
                          <p className="text-xs text-white/40 m-0">
                            Nota: Asegúrese de usar enlaces directos que terminen en la extensión correspondiente para que la página los procese correctamente.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {((uploadMode === 'file' && uploadFile) || (uploadMode === 'url' && mediaUrlInput)) && (
                    <div className="flex gap-3 mt-5">
                      <button
                        onClick={handleSave}
                        disabled={isUploading}
                        className="flex-1 bg-[#00a3ff] text-white border-0 rounded-lg p-3.5 text-sm font-bold cursor-pointer transition-all duration-300 ease-[ease] shadow-[0_4px_14px_rgba(0,163,255,0.3)] hover:not-disabled:bg-[#008be5] hover:not-disabled:-translate-y-0.5 disabled:bg-[rgba(255,255,255,0.05)] disabled:text-white/30 disabled:cursor-not-allowed disabled:shadow-none"
                      >
                        {isUploading ? 'Guardando...' : 'Guardar Cambios'}
                      </button>
                      <button onClick={resetUpload} disabled={isUploading} className="bg-transparent text-white/60 border border-[rgba(255,255,255,0.1)] rounded-lg py-3.5 px-5 text-sm font-semibold cursor-pointer transition-all duration-200 ease-[ease] hover:not-disabled:text-white hover:not-disabled:border-[rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>

                {/* Logging / Progress Terminal */}
                {(logMessages.length > 0 || isUploading) && (() => {
                  const hasError = logMessages.some(msg => msg.includes('❌') || msg.includes('ERROR'));
                  return (
                    <div
                      className={`bg-[#030508] rounded-[10px] font-mono mt-3 overflow-hidden border ${
                        hasError
                          ? 'border-2 border-[#ef4444] bg-[rgba(239,68,68,0.04)] shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                          : 'border-[rgba(255,255,255,0.06)]'
                      }`}
                    >
                      <div
                        className={`bg-[rgba(255,255,255,0.02)] py-2.5 px-4 flex justify-between text-[11px] border-b ${
                          hasError ? 'border-[rgba(239,68,68,0.2)]' : 'border-[rgba(255,255,255,0.04)]'
                        }`}
                      >
                        <span className="text-white/40">Terminal de Estado</span>
                        <span
                          className={`font-bold ${
                            hasError ? 'bg-[#ef4444] text-white py-0.5 px-2 rounded' : 'text-[#00a3ff]'
                          }`}
                        >
                          {isUploading ? 'PROCESANDO' : uploadSuccess ? 'COMPLETADO' : 'INFO'}
                        </span>
                      </div>
                      <div className="p-4 text-xs leading-[1.5] flex flex-col gap-1.5 max-h-[180px] overflow-y-auto">
                        {logMessages.map((msg, idx) => (
                          <div key={idx} className={msg.includes('❌') ? 'text-[#f87171] font-semibold' : msg.includes('✅') || msg.includes('⚙️') ? 'text-[#10b981] font-semibold' : 'text-white/85'}>
                            {msg}
                          </div>
                        ))}
                        {isUploading && <div className="text-[#00a3ff] animate-terminal-pulse">⚡ Guardando los cambios y publicando el contenido...</div>}
                      </div>

                      {hasError && !isUploading && (
                        <div className="flex flex-col gap-2 border-t border-dashed border-[rgba(239,68,68,0.2)] pt-4 px-4 pb-4">
                          <button
                            onClick={handleCopyError}
                            className={`w-full py-4 px-5 text-white border-2 border-white rounded-xl text-[15px] font-bold cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-300 ease-[ease] shadow-[0_4px_15px_rgba(239,68,68,0.3)] ${
                              copiedError ? 'bg-[#10b981]' : 'bg-[#ef4444]'
                            }`}
                          >
                            <span>{copiedError ? '✅ ¡Copiado con éxito!' : '📋 Haz clic aquí para copiar el error y pedir soporte'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="border border-dashed border-[rgba(255,255,255,0.08)] rounded-2xl h-full flex flex-col items-center justify-center text-center p-10 gap-4">
                <span className="text-5xl text-white/10">⚓</span>
                <h3 className="text-lg font-bold">Sin selección</h3>
                <p className="text-[13px] text-white/40 max-w-[320px] leading-[1.5]">Seleccione un recurso de la lista o escanee la landing page desde el panel izquierdo para actualizar el contenido.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
