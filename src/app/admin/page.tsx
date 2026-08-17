'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface MediaAsset {
  id: string;
  name: string;
  description: string;
  path: string;
  type: 'image' | 'video';
  recommendedSize: string;
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
    id: 'background_video',
    name: 'Video o Imagen de Fondo Principal',
    description: 'Se reproduce en bucle en el fondo del Hero, en la sección de Servicios y en la sección CTA.',
    path: '/charger_boat.[ext]',
    type: 'video',
    recommendedSize: 'Cualquier Foto, GIF o Video (Límite 4.5MB)'
  }
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  
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

  // Authenticate locally using sessionStorage
  useEffect(() => {
    const token = sessionStorage.getItem('greylion_admin_token');
    if (token === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    
    // Send a dummy test upload or just verify locally against standard
    // In production we send requests with password to ensure api validation.
    // For client-side route protection, we use a simple sessionStorage save.
    if (password === 'greylion2026') {
      sessionStorage.setItem('greylion_admin_token', 'authenticated');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Contraseña incorrecta. Por favor, intente de nuevo.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('greylion_admin_token');
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Accept any image or video file type globally
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      alert('Por favor seleccione un archivo multimedia válido (imagen, gif o video).');
      return;
    }

    // Check file size (Vercel payload limit is 4.5MB)
    const MAX_SIZE = 4.5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert(`El archivo es demasiado grande (${(file.size / 1024 / 1024).toFixed(2)}MB). El límite de carga es de 4.5MB para evitar errores del servidor (Payload Too Large).`);
      return;
    }

    setUploadFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleSave = async () => {
    if (!selectedAsset) return;
    if (uploadMode === 'file' && !uploadFile) return;
    if (uploadMode === 'url' && !mediaUrlInput) return;

    setIsUploading(true);
    setUploadSuccess(false);
    
    if (uploadMode === 'file' && uploadFile) {
      setLogMessages(['[1/3] Iniciando carga de archivo...', `Recurso: ${selectedAsset.name}`, `Nombre archivo: ${uploadFile.name}`]);
    } else {
      setLogMessages(['[1/3] Registrando enlace externo...', `Recurso: ${selectedAsset.name}`, `Enlace: ${mediaUrlInput}`]);
    }

    const formData = new FormData();
    formData.append('password', password || 'greylion2026');
    formData.append('assetId', selectedAsset.id);
    
    if (uploadMode === 'file' && uploadFile) {
      formData.append('file', uploadFile);
    } else {
      formData.append('url', mediaUrlInput);
    }

    try {
      setLogMessages(prev => [...prev, '[2/3] Procesando y guardando en servidor...']);
      
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
          ? '[3/3] Archivo cargado y configurado con éxito.'
          : '[3/3] Enlace externo guardado con éxito en la configuración.',
        `Sincronización Git: ${data.syncStatus || 'Completado.'}`,
        '¡Proceso finalizado! Los cambios se verán reflejados en breve.'
      ]);
      setUploadSuccess(true);
      
    } catch (err: any) {
      setLogMessages(prev => [...prev, `❌ ERROR: ${err.message || 'Error de conexión'}`]);
    } finally {
      setIsUploading(false);
    }
  };

  // ---------------- RENDER LOGIN SCREEN ----------------
  if (!isAuthenticated) {
    return (
      <main className="admin-login-main">
        <div className="login-card">
          <div className="logo-area">
            <span className="logo-icon">⚓</span>
            <h2>GREYLION MARITIME</h2>
            <p className="subtitle">Gestor de Recursos Multimedia</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="admin-pass">Contraseña Administrativa</label>
              <input
                id="admin-pass"
                type="password"
                placeholder="Ingrese la contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            
            {loginError && <p className="error-message">{loginError}</p>}

            <button type="submit" className="login-btn">Acceder al Panel</button>
          </form>

          <Link href="/" className="back-link">← Volver a la Landing</Link>
        </div>

        <style jsx>{`
          .admin-login-main {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #070b12;
            color: #ffffff;
            font-family: var(--font-inter), sans-serif;
            padding: 20px;
          }
          .login-card {
            width: 100%;
            max-width: 420px;
            background: rgba(18, 20, 23, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(16px);
            display: flex;
            flex-direction: column;
            gap: 28px;
          }
          .logo-area {
            text-align: center;
          }
          .logo-icon {
            font-size: 36px;
            color: #00a3ff;
          }
          .logo-area h2 {
            font-family: var(--font-space-grotesk);
            font-size: 22px;
            font-weight: 800;
            margin-top: 12px;
            letter-spacing: 1.5px;
          }
          .logo-area .subtitle {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.4);
            margin-top: 4px;
          }
          .login-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .form-group label {
            font-size: 12px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.6);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .form-group input {
            background-color: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 14px;
            color: #ffffff;
            font-size: 15px;
            outline: none;
            transition: border-color 0.3s ease;
          }
          .form-group input:focus {
            border-color: #00a3ff;
          }
          .error-message {
            font-size: 13px;
            color: #ff3b30;
            text-align: center;
          }
          .login-btn {
            background-color: #0070f3;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            padding: 14px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 14px rgba(0, 112, 243, 0.3);
          }
          .login-btn:hover {
            background-color: #005ccb;
            transform: translateY(-1px);
          }
          .back-link {
            text-align: center;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.4);
            text-decoration: none;
            transition: color 0.3s ease;
          }
          .back-link:hover {
            color: #ffffff;
          }
        `}</style>
      </main>
    );
  }

  // ---------------- RENDER MAIN ADMIN DASHBOARD ----------------
  return (
    <main className="admin-dashboard-main">
      {/* Top Header */}
      <header className="dashboard-header">
        <div className="w-full max-w-[1280px] mx-auto px-5 header-container">
          <div className="header-logo">
            <span className="logo-icon">⚓</span>
            <h1>GREYLION GESTOR</h1>
          </div>
          <div className="header-actions">
            <Link href="/" className="view-landing-btn">Ver Landing Page</Link>
            <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="w-full max-w-[1280px] mx-auto px-5 dashboard-body">
        <div className="dashboard-grid">
          
          {/* Left Panel: List of Assets */}
          <div className="assets-panel">
            <h2 className="panel-title">Recursos de la Landing</h2>
            <p className="panel-subtitle">Seleccione el recurso que desea actualizar:</p>

            <div className="assets-list">
              {MEDIA_ASSETS.map((asset) => {
                const isSelected = selectedAsset?.id === asset.id;
                return (
                  <button
                    key={asset.id}
                    className={`asset-card ${isSelected ? 'active' : ''}`}
                    onClick={() => selectAsset(asset)}
                  >
                    <div className="asset-type-badge">{asset.type.toUpperCase()}</div>
                    <h3 className="asset-name">{asset.name}</h3>
                    <p className="asset-desc">{asset.description}</p>
                    <div className="asset-meta">
                      <span>Ruta: <code>{asset.path}</code></span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Editor / Dropzone */}
          <div className="editor-panel">
            {selectedAsset ? (
              <div className="editor-card">
                <div className="editor-header">
                  <span className="editor-kicker">Editor de Recurso</span>
                  <h2 className="editor-title">{selectedAsset.name}</h2>
                  <p className="editor-desc">{selectedAsset.description}</p>
                  <p className="recommended-size">
                    <strong>Recomendación:</strong> {selectedAsset.recommendedSize}
                  </p>
                </div>

                {/* Upload Action Area */}
                <div className="upload-section">
                  {/* Mode selector */}
                  <div className="upload-mode-selector" style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                    <button
                      onClick={() => { setUploadMode('file'); resetUpload(); }}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '8px',
                        border: '1px solid ' + (uploadMode === 'file' ? 'var(--primary-hover)' : 'rgba(255,255,255,0.08)'),
                        backgroundColor: uploadMode === 'file' ? 'rgba(0,163,255,0.08)' : 'transparent',
                        color: uploadMode === 'file' ? '#00a3ff' : 'var(--text-gray)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      📁 Archivo Local
                    </button>
                    <button
                      onClick={() => { setUploadMode('url'); resetUpload(); }}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '8px',
                        border: '1px solid ' + (uploadMode === 'url' ? 'var(--primary-hover)' : 'rgba(255,255,255,0.08)'),
                        backgroundColor: uploadMode === 'url' ? 'rgba(0,163,255,0.08)' : 'transparent',
                        color: uploadMode === 'url' ? '#00a3ff' : 'var(--text-gray)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      🔗 Enlace / URL
                    </button>
                  </div>

                  {uploadMode === 'file' ? (
                    <div className="file-dropzone" onClick={() => fileInputRef.current?.click()}>
                      <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: 'none' }}
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                      />
                      
                      {previewUrl && uploadFile ? (
                        <div className="preview-container" onClick={(e) => e.stopPropagation()}>
                          {uploadFile.type.startsWith('video/') ? (
                            <video src={previewUrl} controls className="media-preview" />
                          ) : (
                            <img src={previewUrl} alt="Vista previa" className="media-preview" />
                          )}
                          <button onClick={resetUpload} className="change-file-btn">Cambiar Archivo</button>
                        </div>
                      ) : (
                        <div className="dropzone-prompt">
                          <span className="upload-arrow">⬆</span>
                          <p className="title">Haga clic para subir un archivo nuevo</p>
                          <p className="subtitle">
                            Cualquier imagen, GIF o video (.jpg, .png, .webp, .gif, .mp4)
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                      {previewUrl ? (
                        <div className="preview-container" style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          {(previewUrl.toLowerCase().split('?')[0].endsWith('.mp4') ||
                            previewUrl.toLowerCase().split('?')[0].endsWith('.mov') ||
                            previewUrl.toLowerCase().split('?')[0].endsWith('.webm')) ? (
                            <video src={previewUrl} controls className="media-preview" style={{ maxWidth: '100%', maxHeight: '240px', borderRadius: '8px' }} />
                          ) : (
                            <img src={previewUrl} alt="Vista previa" className="media-preview" style={{ maxWidth: '100%', maxHeight: '240px', borderRadius: '8px', objectFit: 'contain' }} />
                          )}
                          <button onClick={resetUpload} className="change-file-btn" style={{ marginTop: '12px' }}>Limpiar Enlace</button>
                        </div>
                      ) : (
                        <div style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.01)',
                          border: '1px dashed rgba(255, 255, 255, 0.15)',
                          borderRadius: '16px',
                          padding: '40px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px',
                          width: '100%',
                        }}>
                          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-white)' }}>
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
                            style={{
                              width: '100%',
                              padding: '14px 16px',
                              borderRadius: '8px',
                              border: '1px solid rgba(255,255,255,0.08)',
                              backgroundColor: '#0a0b0d',
                              color: '#ffffff',
                              fontSize: '14px',
                              outline: 'none',
                            }}
                          />
                          <p style={{ fontSize: '12px', color: 'var(--text-gray)', margin: 0 }}>
                            Nota: Asegúrese de usar enlaces directos que terminen en la extensión correspondiente para que la página los procese correctamente.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {((uploadMode === 'file' && uploadFile) || (uploadMode === 'url' && mediaUrlInput)) && (
                    <div className="upload-actions" style={{ marginTop: '20px' }}>
                      <button
                        onClick={handleSave}
                        disabled={isUploading}
                        className="save-btn"
                      >
                        {isUploading ? 'Guardando...' : 'Guardar Cambios'}
                      </button>
                      <button onClick={resetUpload} disabled={isUploading} className="cancel-btn">
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>

                {/* Logging / Progress Terminal */}
                {(logMessages.length > 0 || isUploading) && (
                  <div className="terminal-logs">
                    <div className="terminal-header">
                      <span className="terminal-title">Terminal de Estado</span>
                      <span className="terminal-status">{isUploading ? 'PROCESANDO' : uploadSuccess ? 'COMPLETADO' : 'ERROR'}</span>
                    </div>
                    <div className="terminal-body">
                      {logMessages.map((msg, idx) => (
                        <div key={idx} className="log-line">{msg}</div>
                      ))}
                      {isUploading && <div className="log-line pulse">⚡ Ejecutando commit de Git y actualizando repositorio de Vercel...</div>}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-selection-card">
                <span className="selection-icon">⚓</span>
                <h3>Sin selección</h3>
                <p>Seleccione un recurso multimedia del panel izquierdo para comenzar el proceso de actualización.</p>
              </div>
            )}
          </div>

        </div>
      </div>

      <style jsx>{`
        .admin-dashboard-main {
          min-height: 100vh;
          background-color: #070b12;
          color: #ffffff;
          font-family: var(--font-inter), sans-serif;
          padding-bottom: 80px;
        }
        .dashboard-header {
          background-color: #0d1118;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 20px 0;
          position: sticky;
          top: 0;
          z-index: 40;
        }
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .header-logo .logo-icon {
          font-size: 24px;
          color: #00a3ff;
        }
        .header-logo h1 {
          font-family: var(--font-space-grotesk);
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 1px;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .view-landing-btn {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.2s ease;
        }
        .view-landing-btn:hover {
          color: #ffffff;
          border-color: #ffffff;
        }
        .logout-btn {
          font-size: 13px;
          font-weight: 600;
          color: #ff3b30;
          background: transparent;
          border: 1px solid rgba(255,59,48,0.2);
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .logout-btn:hover {
          background: rgba(255,59,48,0.1);
          border-color: #ff3b30;
        }
        .dashboard-body {
          margin-top: 40px;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.5fr;
          gap: 40px;
        }
        .assets-panel {
          background: rgba(13, 17, 24, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 32px;
        }
        .panel-title {
          font-family: var(--font-space-grotesk);
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 4px;
        }
        .panel-subtitle {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 24px;
        }
        .assets-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .asset-card {
          width: 100%;
          text-align: left;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 6px;
          outline: none;
        }
        .asset-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.15);
        }
        .asset-card.active {
          background: rgba(0, 163, 255, 0.05);
          border-color: #00a3ff;
        }
        .asset-type-badge {
          font-size: 9px;
          font-weight: 800;
          color: #00a3ff;
          letter-spacing: 0.1em;
          background: rgba(0, 163, 255, 0.1);
          padding: 3px 8px;
          border-radius: 4px;
          width: fit-content;
        }
        .asset-name {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
        }
        .asset-desc {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.4;
        }
        .asset-meta {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.3);
          margin-top: 4px;
        }
        .asset-meta code {
          background-color: rgba(0, 0, 0, 0.2);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .editor-panel {
          min-height: 500px;
        }
        .editor-card {
          background: #0d1118;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .editor-kicker {
          font-size: 11px;
          font-weight: 800;
          color: #00a3ff;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .editor-title {
          font-family: var(--font-space-grotesk);
          font-size: 24px;
          font-weight: 800;
          margin-top: 4px;
        }
        .editor-desc {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.5;
          margin-top: 8px;
        }
        .recommended-size {
          font-size: 13px;
          color: #ffb800;
          margin-top: 12px;
          background: rgba(255, 184, 0, 0.08);
          border: 1px solid rgba(255, 184, 0, 0.2);
          padding: 10px 14px;
          border-radius: 8px;
        }
        .file-dropzone {
          border: 2px dashed rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 40px;
          text-align: center;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.01);
          transition: all 0.3s ease;
          position: relative;
        }
        .file-dropzone:hover {
          border-color: #00a3ff;
          background: rgba(0, 163, 255, 0.02);
        }
        .dropzone-prompt {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .upload-arrow {
          font-size: 32px;
          color: rgba(255, 255, 255, 0.3);
        }
        .dropzone-prompt .title {
          font-size: 15px;
          font-weight: 700;
        }
        .dropzone-prompt .subtitle {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
        }
        .preview-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .media-preview {
          max-height: 240px;
          max-width: 100%;
          border-radius: 8px;
          object-fit: contain;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .change-file-btn {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .change-file-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        .upload-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
        .save-btn {
          flex: 1;
          background-color: #00a3ff;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          padding: 14px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px rgba(0, 163, 255, 0.3);
        }
        .save-btn:hover:not(:disabled) {
          background-color: #008be5;
          transform: translateY(-1px);
        }
        .save-btn:disabled {
          background-color: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.3);
          cursor: not-allowed;
          box-shadow: none;
        }
        .cancel-btn {
          background-color: transparent;
          color: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 14px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cancel-btn:hover:not(:disabled) {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.3);
        }
        .cancel-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .terminal-logs {
          background-color: #030508;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          font-family: monospace;
          margin-top: 12px;
          overflow: hidden;
        }
        .terminal-header {
          background-color: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          padding: 10px 16px;
          display: flex;
          justify-content: space-between;
          font-size: 11px;
        }
        .terminal-title {
          color: rgba(255, 255, 255, 0.4);
        }
        .terminal-status {
          color: #00a3ff;
          font-weight: bold;
        }
        .terminal-body {
          padding: 16px;
          font-size: 12px;
          line-height: 1.5;
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 180px;
          overflow-y: auto;
        }
        .log-line {
          color: rgba(255, 255, 255, 0.85);
        }
        .log-line.pulse {
          color: #00a3ff;
          animation: terminalPulse 1.5s infinite;
        }
        @keyframes terminalPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .no-selection-card {
          border: 1px dashed rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justifyContent: center;
          text-align: center;
          padding: 40px;
          gap: 16px;
        }
        .selection-icon {
          font-size: 48px;
          color: rgba(255, 255, 255, 0.1);
        }
        .no-selection-card h3 {
          font-size: 18px;
          font-weight: 700;
        }
        .no-selection-card p {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
          max-width: 320px;
          line-height: 1.5;
        }
        @media (max-width: 991px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </main>
  );
}
