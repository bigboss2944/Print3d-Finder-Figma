# Architecture Technique - Print3D Finder

## 1. Vue d'Ensemble de l'Architecture

### 1.1 Diagramme de Haut Niveau

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENTS / INTERFACE                       │
├─────────────────────┬───────────────────────────────────────┤
│   Application Web   │      Application Mobile               │
│   Blazor .NET 10    │      .NET MAUI                        │
│   (WebAssembly/     │      (Android 7.0+,                   │
│    Server)          │       iOS 13+)                        │
└──────────┬──────────┴──────────┬────────────────────────────┘
           │                     │
           │  HTTPS/TLS 1.3     │
           │  JSON/REST API     │
           │                     │
┌──────────┴─────────────────────┴────────────────────────────┐
│                    API GATEWAY                               │
│                    (Rate Limiting, WAF)                      │
└──────────┬──────────────────────────────────────────────────┘
           │
┌──────────┴─────────────────────────────────────────────────┐
│              BACKEND - ASP.NET CORE API                     │
│                      (.NET 10)                               │
├──────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ │
│  │ Auth Service   │  │ Search Service │  │ Model Service │ │
│  │ (JWT, Identity)│  │ (Elastic/Azure)│  │ (3D Analysis) │ │
│  └────────────────┘  └────────────────┘  └───────────────┘ │
│  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ │
│  │ Order Service  │  │ User Service   │  │ Notification  │ │
│  │ (Commandes)    │  │ (Profils)      │  │ Service       │ │
│  └────────────────┘  └────────────────┘  └───────────────┘ │
└──────────┬──────────────────┬────────────────┬──────────────┘
           │                  │                │
┌──────────┴──────────┐ ┌─────┴─────┐ ┌───────┴──────────┐
│   PostgreSQL/       │ │  Redis    │ │  Azure Blob/     │
│   SQL Server        │ │  Cache    │ │  AWS S3          │
│   (EF Core)         │ │           │ │  (Fichiers 3D)   │
└─────────────────────┘ └───────────┘ └──────────────────┘
           │
┌──────────┴──────────────────────────────────────────────────┐
│              SERVICES EXTERNES                               │
├──────────────────────────────────────────────────────────────┤
│  • Azure Computer Vision / Google Cloud Vision (Recherche)  │
│  • SendGrid / Azure Communication (Emails)                   │
│  • Firebase / Azure Notification Hub (Push Notifications)   │
│  • Stripe / PayPal (Paiements - Phase Future)               │
└──────────────────────────────────────────────────────────────┘
```

## 2. Architecture Détaillée par Couche

### 2.1 Couche Présentation

#### 2.1.1 Application Web (Blazor .NET 10)

**Technologies:**
- Blazor WebAssembly ou Blazor Server (choix selon besoins)
- C# 12
- Razor Components
- Tailwind CSS ou MudBlazor pour l'UI

**Structure des Composants:**
```
BlazorApp/
├── Pages/
│   ├── Index.razor                  # Page d'accueil
│   ├── Search.razor                 # Page de recherche
│   ├── SearchResults.razor          # Résultats
│   ├── ModelDetails.razor           # Détails du modèle
│   ├── PrintRequest.razor           # Demande d'impression
│   ├── Account/
│   │   ├── Login.razor              # Connexion
│   │   ├── Register.razor           # Inscription
│   │   └── Profile.razor            # Profil utilisateur
│   └── Admin/
│       ├── Dashboard.razor          # Tableau de bord
│       ├── Orders.razor             # Gestion commandes
│       └── Users.razor              # Gestion utilisateurs
├── Shared/
│   ├── MainLayout.razor             # Layout principal
│   ├── NavMenu.razor                # Menu navigation
│   └── Components/
│       ├── Model3DViewer.razor      # Visualiseur 3D
│       ├── SearchBar.razor          # Barre de recherche
│       ├── ImageUpload.razor        # Upload d'image
│       └── PrintabilityReport.razor # Rapport d'analyse
├── Services/
│   ├── ApiClient.cs                 # Client HTTP API
│   ├── AuthService.cs               # Service d'authentification
│   └── StateContainer.cs            # Gestion d'état
└── wwwroot/
    ├── css/                         # Styles
    ├── js/                          # Scripts JavaScript
    └── lib/                         # Librairies tierces
```

**Communication avec l'API:**
```csharp
// Exemple de service API
public class ApiClient
{
    private readonly HttpClient _httpClient;
    private readonly ILocalStorageService _localStorage;

    public ApiClient(HttpClient httpClient, ILocalStorageService localStorage)
    {
        _httpClient = httpClient;
        _localStorage = localStorage;
    }

    public async Task<List<Model3D>> SearchModelsAsync(string query)
    {
        var token = await _localStorage.GetItemAsync<string>("authToken");
        _httpClient.DefaultRequestHeaders.Authorization = 
            new AuthenticationHeaderValue("Bearer", token);
        
        var response = await _httpClient.GetAsync($"api/models/search?q={query}");
        response.EnsureSuccessStatusCode();
        
        return await response.Content.ReadFromJsonAsync<List<Model3D>>();
    }
}
```

#### 2.1.2 Application Mobile (.NET MAUI)

**Technologies:**
- .NET MAUI (.NET 10)
- C# 12
- XAML
- MAUI Community Toolkit
- CommunityToolkit.Mvvm (MVVM pattern)

**Structure du Projet:**
```
MauiApp/
├── Views/
│   ├── LoginPage.xaml               # Page de connexion
│   ├── SearchPage.xaml              # Page de recherche
│   ├── SearchResultsPage.xaml       # Résultats
│   ├── ModelDetailsPage.xaml        # Détails
│   ├── PrintRequestPage.xaml        # Demande d'impression
│   ├── ProfilePage.xaml             # Profil
│   └── OrdersPage.xaml              # Mes commandes
├── ViewModels/
│   ├── LoginViewModel.cs
│   ├── SearchViewModel.cs
│   ├── SearchResultsViewModel.cs
│   ├── ModelDetailsViewModel.cs
│   └── PrintRequestViewModel.cs
├── Models/
│   ├── Model3D.cs
│   ├── User.cs
│   ├── Order.cs
│   └── PrintRequest.cs
├── Services/
│   ├── ApiService.cs                # Communication API
│   ├── AuthService.cs               # Authentification
│   ├── CameraService.cs             # Accès caméra
│   ├── NotificationService.cs       # Notifications push
│   └── StorageService.cs            # Stockage local
├── Platforms/
│   ├── Android/                     # Code spécifique Android
│   └── iOS/                         # Code spécifique iOS
└── Resources/
    ├── Images/                      # Images de l'app
    ├── Fonts/                       # Polices
    └── Styles/                      # Styles XAML
```

**Exemple de ViewModel (MVVM):**
```csharp
public partial class SearchViewModel : ObservableObject
{
    private readonly IApiService _apiService;
    private readonly ICameraService _cameraService;

    [ObservableProperty]
    private string searchQuery;

    [ObservableProperty]
    private bool isLoading;

    [ObservableProperty]
    private ObservableCollection<Model3D> searchResults;

    public SearchViewModel(IApiService apiService, ICameraService cameraService)
    {
        _apiService = apiService;
        _cameraService = cameraService;
    }

    [RelayCommand]
    private async Task SearchAsync()
    {
        IsLoading = true;
        try
        {
            SearchResults = new ObservableCollection<Model3D>(
                await _apiService.SearchModelsAsync(SearchQuery)
            );
        }
        catch (Exception ex)
        {
            // Gérer l'erreur
        }
        finally
        {
            IsLoading = false;
        }
    }

    [RelayCommand]
    private async Task TakePhotoAsync()
    {
        var photo = await _cameraService.TakePhotoAsync();
        if (photo != null)
        {
            IsLoading = true;
            SearchResults = new ObservableCollection<Model3D>(
                await _apiService.SearchByImageAsync(photo)
            );
            IsLoading = false;
        }
    }
}
```

### 2.2 Couche API (Backend)

#### 2.2.1 Structure du Projet API

```
Print3DFinder.Api/
├── Controllers/
│   ├── AuthController.cs            # Authentification
│   ├── UsersController.cs           # Gestion utilisateurs
│   ├── ModelsController.cs          # Modèles 3D
│   ├── SearchController.cs          # Recherche
│   ├── OrdersController.cs          # Commandes
│   └── AdminController.cs           # Administration
├── Services/
│   ├── Interfaces/
│   │   ├── IAuthService.cs
│   │   ├── ISearchService.cs
│   │   ├── IModel3DService.cs
│   │   ├── IOrderService.cs
│   │   └── INotificationService.cs
│   └── Implementations/
│       ├── AuthService.cs
│       ├── SearchService.cs
│       ├── Model3DService.cs
│       ├── OrderService.cs
│       └── NotificationService.cs
├── Data/
│   ├── ApplicationDbContext.cs      # EF Core Context
│   ├── Entities/                    # Entités EF Core
│   │   ├── User.cs
│   │   ├── Model3D.cs
│   │   ├── Order.cs
│   │   ├── Material.cs
│   │   └── Category.cs
│   └── Migrations/                  # Migrations EF
├── DTOs/
│   ├── Auth/
│   │   ├── LoginRequest.cs
│   │   ├── RegisterRequest.cs
│   │   └── TokenResponse.cs
│   ├── Models/
│   │   ├── Model3DDto.cs
│   │   └── PrintabilityReportDto.cs
│   └── Orders/
│       ├── CreateOrderRequest.cs
│       └── OrderDto.cs
├── Middleware/
│   ├── ErrorHandlingMiddleware.cs   # Gestion erreurs globale
│   ├── RateLimitingMiddleware.cs    # Rate limiting
│   └── JwtMiddleware.cs             # Validation JWT
├── Utilities/
│   ├── PasswordHasher.cs            # Hashage mots de passe
│   ├── JwtTokenGenerator.cs         # Génération tokens JWT
│   ├── EncryptionHelper.cs          # Chiffrement données
│   └── Model3DAnalyzer.cs           # Analyse modèles 3D
└── Program.cs                       # Point d'entrée
```

#### 2.2.2 Configuration de l'API (Program.cs)

```csharp
var builder = WebApplication.CreateBuilder(args);

// Configuration de la base de données
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configuration d'Identity pour l'authentification
builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// Configuration JWT
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]))
    };
});

// Configuration CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins(
            "https://print3dfinder.com",
            "https://app.print3dfinder.com"
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

// Injection de dépendances
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ISearchService, SearchService>();
builder.Services.AddScoped<IModel3DService, Model3DService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<INotificationService, NotificationService>();

// Configuration Redis pour le cache
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration.GetConnectionString("Redis");
    options.InstanceName = "Print3DFinder_";
});

// Configuration de Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "Print3D Finder API", 
        Version = "v1",
        Description = "API pour la plateforme Print3D Finder"
    });
    
    // Configuration JWT pour Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });
});

// Rate Limiting
builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: context.User.Identity?.Name ?? context.Request.Headers.Host.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 100,
                QueueLimit = 0,
                Window = TimeSpan.FromMinutes(1)
            }));
});

builder.Services.AddControllers();

var app = builder.Build();

// Configuration du pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ErrorHandlingMiddleware>();

app.MapControllers();

app.Run();
```

#### 2.2.3 Exemple de Controller

```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ModelsController : ControllerBase
{
    private readonly IModel3DService _model3DService;
    private readonly ILogger<ModelsController> _logger;

    public ModelsController(
        IModel3DService model3DService,
        ILogger<ModelsController> logger)
    {
        _model3DService = model3DService;
        _logger = logger;
    }

    /// <summary>
    /// Recherche de modèles 3D par texte
    /// </summary>
    [HttpGet("search")]
    public async Task<ActionResult<List<Model3DDto>>> Search(
        [FromQuery] string query,
        [FromQuery] string? category = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        try
        {
            var results = await _model3DService.SearchAsync(query, category, page, pageSize);
            return Ok(results);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching models");
            return StatusCode(500, "Internal server error");
        }
    }

    /// <summary>
    /// Recherche de modèles 3D par image
    /// </summary>
    [HttpPost("search-by-image")]
    [RequestSizeLimit(10_485_760)] // 10 MB
    public async Task<ActionResult<List<Model3DDto>>> SearchByImage(
        [FromForm] IFormFile image)
    {
        if (image == null || image.Length == 0)
            return BadRequest("Image is required");

        if (!IsValidImageFormat(image))
            return BadRequest("Invalid image format. Only JPG, PNG, HEIC are allowed");

        try
        {
            var results = await _model3DService.SearchByImageAsync(image);
            return Ok(results);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching by image");
            return StatusCode(500, "Internal server error");
        }
    }

    /// <summary>
    /// Analyse de la printabilité d'un modèle
    /// </summary>
    [HttpGet("{id}/analyze")]
    public async Task<ActionResult<PrintabilityReportDto>> AnalyzePrintability(string id)
    {
        try
        {
            var report = await _model3DService.AnalyzePrintabilityAsync(id);
            if (report == null)
                return NotFound();

            return Ok(report);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error analyzing model {ModelId}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    private bool IsValidImageFormat(IFormFile file)
    {
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".heic" };
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        return allowedExtensions.Contains(extension);
    }
}
```

#### 2.2.4 Controller Administrateur - Gestion des Matériaux

```csharp
[ApiController]
[Route("api/admin/[controller]")]
[Authorize(Roles = "Admin,SuperAdmin")]
public class MaterialsController : ControllerBase
{
    private readonly IMaterialService _materialService;
    private readonly ILogger<MaterialsController> _logger;

    public MaterialsController(
        IMaterialService materialService,
        ILogger<MaterialsController> logger)
    {
        _materialService = materialService;
        _logger = logger;
    }

    /// <summary>
    /// Récupère la liste de tous les matériaux
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<MaterialDto>>> GetAll(
        [FromQuery] bool includeInactive = false)
    {
        try
        {
            var materials = await _materialService.GetAllAsync(includeInactive);
            return Ok(materials);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving materials");
            return StatusCode(500, "Erreur lors de la récupération des matériaux");
        }
    }

    /// <summary>
    /// Récupère un matériau par son ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<MaterialDto>> GetById(Guid id)
    {
        try
        {
            var material = await _materialService.GetByIdAsync(id);
            if (material == null)
                return NotFound($"Matériau {id} introuvable");

            return Ok(material);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving material {MaterialId}", id);
            return StatusCode(500, "Erreur lors de la récupération du matériau");
        }
    }

    /// <summary>
    /// Crée un nouveau matériau
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<MaterialDto>> Create(
        [FromBody] CreateMaterialRequest request)
    {
        try
        {
            var material = await _materialService.CreateAsync(request);
            
            _logger.LogInformation(
                "Material {MaterialName} created by {UserId}",
                material.Name,
                User.FindFirst("sub")?.Value);

            return CreatedAtAction(
                nameof(GetById),
                new { id = material.Id },
                material);
        }
        catch (ValidationException ex)
        {
            return BadRequest(new { message = ex.Message, errors = ex.Errors });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating material");
            return StatusCode(500, "Erreur lors de la création du matériau");
        }
    }

    /// <summary>
    /// Met à jour un matériau existant
    /// </summary>
    [HttpPut("{id}")]
    public async Task<ActionResult<MaterialDto>> Update(
        Guid id,
        [FromBody] UpdateMaterialRequest request)
    {
        try
        {
            var material = await _materialService.UpdateAsync(id, request);
            if (material == null)
                return NotFound($"Matériau {id} introuvable");

            _logger.LogInformation(
                "Material {MaterialId} updated by {UserId}",
                id,
                User.FindFirst("sub")?.Value);

            return Ok(material);
        }
        catch (ValidationException ex)
        {
            return BadRequest(new { message = ex.Message, errors = ex.Errors });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating material {MaterialId}", id);
            return StatusCode(500, "Erreur lors de la mise à jour du matériau");
        }
    }

    /// <summary>
    /// Supprime (archive) un matériau
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _materialService.DeleteAsync(id);
            if (!result)
                return NotFound($"Matériau {id} introuvable");

            _logger.LogInformation(
                "Material {MaterialId} deleted by {UserId}",
                id,
                User.FindFirst("sub")?.Value);

            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting material {MaterialId}", id);
            return StatusCode(500, "Erreur lors de la suppression du matériau");
        }
    }

    /// <summary>
    /// Active ou désactive un matériau
    /// </summary>
    [HttpPatch("{id}/toggle-status")]
    public async Task<ActionResult> ToggleStatus(Guid id)
    {
        try
        {
            var result = await _materialService.ToggleStatusAsync(id);
            if (!result)
                return NotFound($"Matériau {id} introuvable");

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error toggling material status {MaterialId}", id);
            return StatusCode(500, "Erreur lors du changement de statut");
        }
    }
}

// DTOs pour les matériaux
public class MaterialDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; } // PLA, ABS, PETG, Résine, etc.
    public List<string> AvailableColors { get; set; }
    public decimal PricePerGram { get; set; }
    public int? RecommendedTemperature { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
    public bool IsActive { get; set; }
    public int StockQuantity { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class CreateMaterialRequest
{
    [Required(ErrorMessage = "Le nom du matériau est obligatoire")]
    [MaxLength(100)]
    public string Name { get; set; }

    [Required(ErrorMessage = "Le type de matériau est obligatoire")]
    public string Type { get; set; }

    [Required(ErrorMessage = "Au moins une couleur doit être disponible")]
    public List<string> AvailableColors { get; set; }

    [Required]
    [Range(0.01, 100, ErrorMessage = "Le prix doit être entre 0.01 et 100€")]
    public decimal PricePerGram { get; set; }

    [Range(150, 350, ErrorMessage = "La température doit être entre 150 et 350°C")]
    public int? RecommendedTemperature { get; set; }

    [MaxLength(500)]
    public string Description { get; set; }

    public string ImageUrl { get; set; }
    
    public int StockQuantity { get; set; } = 0;
}

public class UpdateMaterialRequest : CreateMaterialRequest
{
    public bool? IsActive { get; set; }
}
```

#### 2.2.5 Controller Administrateur - Gestion des Sources de Modèles

```csharp
[ApiController]
[Route("api/admin/[controller]")]
[Authorize(Roles = "Admin,SuperAdmin")]
public class ModelSourcesController : ControllerBase
{
    private readonly IModelSourceService _sourceService;
    private readonly ILogger<ModelSourcesController> _logger;

    public ModelSourcesController(
        IModelSourceService sourceService,
        ILogger<ModelSourcesController> logger)
    {
        _sourceService = sourceService;
        _logger = logger;
    }

    /// <summary>
    /// Récupère la liste de toutes les sources configurées
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<ModelSourceDto>>> GetAll()
    {
        try
        {
            var sources = await _sourceService.GetAllAsync();
            return Ok(sources);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving model sources");
            return StatusCode(500, "Erreur lors de la récupération des sources");
        }
    }

    /// <summary>
    /// Récupère une source par son ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<ModelSourceDto>> GetById(Guid id)
    {
        try
        {
            var source = await _sourceService.GetByIdAsync(id);
            if (source == null)
                return NotFound($"Source {id} introuvable");

            return Ok(source);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving source {SourceId}", id);
            return StatusCode(500, "Erreur lors de la récupération de la source");
        }
    }

    /// <summary>
    /// Ajoute une nouvelle source de modèles
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<ModelSourceDto>> Create(
        [FromBody] CreateModelSourceRequest request)
    {
        try
        {
            var source = await _sourceService.CreateAsync(request);
            
            _logger.LogInformation(
                "Model source {SourceName} created by {UserId}",
                source.Name,
                User.FindFirst("sub")?.Value);

            return CreatedAtAction(
                nameof(GetById),
                new { id = source.Id },
                source);
        }
        catch (ValidationException ex)
        {
            return BadRequest(new { message = ex.Message, errors = ex.Errors });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating model source");
            return StatusCode(500, "Erreur lors de la création de la source");
        }
    }

    /// <summary>
    /// Met à jour une source existante
    /// </summary>
    [HttpPut("{id}")]
    public async Task<ActionResult<ModelSourceDto>> Update(
        Guid id,
        [FromBody] UpdateModelSourceRequest request)
    {
        try
        {
            var source = await _sourceService.UpdateAsync(id, request);
            if (source == null)
                return NotFound($"Source {id} introuvable");

            _logger.LogInformation(
                "Model source {SourceId} updated by {UserId}",
                id,
                User.FindFirst("sub")?.Value);

            return Ok(source);
        }
        catch (ValidationException ex)
        {
            return BadRequest(new { message = ex.Message, errors = ex.Errors });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating source {SourceId}", id);
            return StatusCode(500, "Erreur lors de la mise à jour de la source");
        }
    }

    /// <summary>
    /// Supprime une source
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        try
        {
            var result = await _sourceService.DeleteAsync(id);
            if (!result)
                return NotFound($"Source {id} introuvable");

            _logger.LogInformation(
                "Model source {SourceId} deleted by {UserId}",
                id,
                User.FindFirst("sub")?.Value);

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting source {SourceId}", id);
            return StatusCode(500, "Erreur lors de la suppression de la source");
        }
    }

    /// <summary>
    /// Active ou désactive une source
    /// </summary>
    [HttpPatch("{id}/toggle-status")]
    public async Task<ActionResult> ToggleStatus(Guid id)
    {
        try
        {
            var result = await _sourceService.ToggleStatusAsync(id);
            if (!result)
                return NotFound($"Source {id} introuvable");

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error toggling source status {SourceId}", id);
            return StatusCode(500, "Erreur lors du changement de statut");
        }
    }

    /// <summary>
    /// Lance une synchronisation manuelle d'une source
    /// </summary>
    [HttpPost("{id}/sync")]
    public async Task<ActionResult<SyncResultDto>> TriggerSync(Guid id)
    {
        try
        {
            var result = await _sourceService.SyncAsync(id);
            if (result == null)
                return NotFound($"Source {id} introuvable");

            _logger.LogInformation(
                "Manual sync triggered for source {SourceId} by {UserId}",
                id,
                User.FindFirst("sub")?.Value);

            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error syncing source {SourceId}", id);
            return StatusCode(500, "Erreur lors de la synchronisation");
        }
    }

    /// <summary>
    /// Récupère les statistiques d'une source
    /// </summary>
    [HttpGet("{id}/stats")]
    public async Task<ActionResult<SourceStatsDto>> GetStats(Guid id)
    {
        try
        {
            var stats = await _sourceService.GetStatsAsync(id);
            if (stats == null)
                return NotFound($"Source {id} introuvable");

            return Ok(stats);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving stats for source {SourceId}", id);
            return StatusCode(500, "Erreur lors de la récupération des statistiques");
        }
    }
}

// DTOs pour les sources de modèles
public class ModelSourceDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Url { get; set; }
    public string Description { get; set; }
    public SourceType Type { get; set; } // API, WebScraping
    public string ApiKey { get; set; } // Masqué dans les réponses
    public bool IsActive { get; set; }
    public int SyncFrequencyHours { get; set; }
    public DateTime? LastSyncAt { get; set; }
    public SourceStatus Status { get; set; }
    public int ModelsCount { get; set; }
    public int Priority { get; set; }
    public List<string> AllowedCategories { get; set; }
    public int RateLimitPerHour { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class CreateModelSourceRequest
{
    [Required(ErrorMessage = "Le nom de la source est obligatoire")]
    [MaxLength(100)]
    public string Name { get; set; }

    [Required(ErrorMessage = "L'URL est obligatoire")]
    [Url(ErrorMessage = "L'URL n'est pas valide")]
    public string Url { get; set; }

    [MaxLength(500)]
    public string Description { get; set; }

    [Required]
    public SourceType Type { get; set; }

    public string ApiKey { get; set; }

    [Range(1, 168, ErrorMessage = "La fréquence doit être entre 1 et 168 heures")]
    public int SyncFrequencyHours { get; set; } = 24;

    [Range(1, 10, ErrorMessage = "La priorité doit être entre 1 et 10")]
    public int Priority { get; set; } = 5;

    public List<string> AllowedCategories { get; set; } = new();

    [Range(10, 10000, ErrorMessage = "Le rate limit doit être entre 10 et 10000 requêtes/heure")]
    public int RateLimitPerHour { get; set; } = 100;
}

public class UpdateModelSourceRequest : CreateModelSourceRequest
{
    public bool? IsActive { get; set; }
}

public class SyncResultDto
{
    public Guid SourceId { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime CompletedAt { get; set; }
    public int ModelsAdded { get; set; }
    public int ModelsUpdated { get; set; }
    public int ModelsDeleted { get; set; }
    public int Errors { get; set; }
    public List<string> ErrorMessages { get; set; }
}

public class SourceStatsDto
{
    public Guid SourceId { get; set; }
    public int TotalModels { get; set; }
    public int ModelsLastMonth { get; set; }
    public int AverageResponseTimeMs { get; set; }
    public double SuccessRate { get; set; }
    public DateTime? LastSuccessfulSync { get; set; }
    public int UserSearchCount { get; set; }
    public double UserSatisfactionRate { get; set; }
}

public enum SourceType
{
    API,
    WebScraping
}

public enum SourceStatus
{
    Active,
    Inactive,
    Error,
    Syncing
}
```
```

### 2.3 Couche Données

#### 2.3.1 Modèle de Données (Entity Framework Core)

```csharp
// Entité User avec nom d'utilisateur sécurisé
public class User : IdentityUser
{
    [Required]
    [MaxLength(256)]
    public string EncryptedUsername { get; set; } // Nom d'utilisateur chiffré
    
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
    
    // Relations
    public virtual ICollection<Order> Orders { get; set; }
    public virtual ICollection<Favorite> Favorites { get; set; }
    public virtual ICollection<Review> Reviews { get; set; }
}

// Entité Model3D
public class Model3D
{
    [Key]
    public Guid Id { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    [Required]
    public string FileUrl { get; set; } // URL dans Azure Blob/S3
    
    public string ThumbnailUrl { get; set; }
    
    // Métadonnées
    public double Width { get; set; }  // en mm
    public double Height { get; set; } // en mm
    public double Depth { get; set; }  // en mm
    public double Volume { get; set; } // en cm³
    
    public int Downloads { get; set; }
    public decimal AverageRating { get; set; }
    public int ReviewCount { get; set; }
    
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    // Relations
    public Guid CategoryId { get; set; }
    public virtual Category Category { get; set; }
    
    public virtual ICollection<ModelMaterial> CompatibleMaterials { get; set; }
    public virtual ICollection<Order> Orders { get; set; }
    public virtual ICollection<Favorite> Favorites { get; set; }
    public virtual ICollection<Review> Reviews { get; set; }
}

// Entité Order
public class Order
{
    [Key]
    public Guid Id { get; set; }
    
    public string OrderNumber { get; set; } // REF-XXXXX
    
    // Relations
    public string UserId { get; set; }
    public virtual User User { get; set; }
    
    public Guid ModelId { get; set; }
    public virtual Model3D Model { get; set; }
    
    // Configuration d'impression
    public Guid MaterialId { get; set; }
    public virtual Material Material { get; set; }
    
    public string Color { get; set; }
    public PrintQuality Quality { get; set; } // Draft, Standard, HighQuality
    public int InfillPercentage { get; set; }
    public double Scale { get; set; }
    
    // Statut
    public OrderStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    
    // Coûts
    public decimal MaterialCost { get; set; }
    public decimal LaborCost { get; set; }
    public decimal ShippingCost { get; set; }
    public decimal TotalCost { get; set; }
    
    // Livraison
    public string ShippingAddress { get; set; }
    public string TrackingNumber { get; set; }
}

// Énumérations
public enum OrderStatus
{
    PendingValidation,
    InPreparation,
    Printing,
    PostProcessing,
    ReadyToShip,
    Shipped,
    Delivered,
    Cancelled
}

public enum PrintQuality
{
    Draft,      // 0.3mm
    Standard,   // 0.2mm
    HighQuality // 0.1mm
}

// Entité Category
public class Category
{
    [Key]
    public Guid Id { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }
    
    public string Icon { get; set; }
    public int DisplayOrder { get; set; }
    
    public virtual ICollection<Model3D> Models { get; set; }
}

// Entité Material
public class Material
{
    [Key]
    public Guid Id { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string Name { get; set; } // PLA, ABS, PETG, TPU, Resin
    
    public string Description { get; set; }
    public decimal PricePerGram { get; set; }
    public bool IsAvailable { get; set; }
    
    public virtual ICollection<ModelMaterial> CompatibleModels { get; set; }
    public virtual ICollection<Order> Orders { get; set; }
}
```

#### 2.3.2 DbContext Configuration

```csharp
public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Model3D> Models { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Material> Materials { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Favorite> Favorites { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuration User
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.EncryptedUsername).IsUnique();
            entity.Property(e => e.EncryptedUsername).IsRequired();
        });

        // Configuration Model3D
        modelBuilder.Entity<Model3D>(entity =>
        {
            entity.HasIndex(e => e.Name);
            entity.HasIndex(e => e.CategoryId);
            entity.Property(e => e.AverageRating).HasPrecision(3, 2);
        });

        // Configuration Order
        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasIndex(e => e.OrderNumber).IsUnique();
            entity.HasIndex(e => e.UserId);
            entity.HasIndex(e => e.Status);
            entity.HasIndex(e => e.CreatedAt);
            
            entity.Property(e => e.MaterialCost).HasPrecision(10, 2);
            entity.Property(e => e.LaborCost).HasPrecision(10, 2);
            entity.Property(e => e.ShippingCost).HasPrecision(10, 2);
            entity.Property(e => e.TotalCost).HasPrecision(10, 2);
        });

        // Configuration Material
        modelBuilder.Entity<Material>(entity =>
        {
            entity.Property(e => e.PricePerGram).HasPrecision(10, 4);
        });

        // Seed des données initiales
        SeedData(modelBuilder);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        // Catégories
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = Guid.NewGuid(), Name = "Décoration", Icon = "🏠", DisplayOrder = 1 },
            new Category { Id = Guid.NewGuid(), Name = "Gadgets", Icon = "🔧", DisplayOrder = 2 },
            new Category { Id = Guid.NewGuid(), Name = "Jouets", Icon = "🎮", DisplayOrder = 3 },
            new Category { Id = Guid.NewGuid(), Name = "Art", Icon = "🎨", DisplayOrder = 4 },
            new Category { Id = Guid.NewGuid(), Name = "Utilitaire", Icon = "⚙️", DisplayOrder = 5 },
            new Category { Id = Guid.NewGuid(), Name = "Mode", Icon = "👔", DisplayOrder = 6 }
        );

        // Matériaux
        modelBuilder.Entity<Material>().HasData(
            new Material { Id = Guid.NewGuid(), Name = "PLA", Description = "Biodégradable, facile à imprimer", PricePerGram = 0.025m, IsAvailable = true },
            new Material { Id = Guid.NewGuid(), Name = "ABS", Description = "Résistant, supporte la chaleur", PricePerGram = 0.030m, IsAvailable = true },
            new Material { Id = Guid.NewGuid(), Name = "PETG", Description = "Résistant aux UV, usage extérieur", PricePerGram = 0.035m, IsAvailable = true },
            new Material { Id = Guid.NewGuid(), Name = "TPU", Description = "Flexible, élastique", PricePerGram = 0.050m, IsAvailable = true },
            new Material { Id = Guid.NewGuid(), Name = "Résine", Description = "Haute précision, détails fins", PricePerGram = 0.080m, IsAvailable = true }
        );
    }
}
```

### 2.4 Services Externes et Intégrations

#### 2.4.1 Service de Recherche par Image (Azure Computer Vision)

```csharp
public class ImageSearchService : IImageSearchService
{
    private readonly ComputerVisionClient _visionClient;
    private readonly IModel3DService _model3DService;
    private readonly ILogger<ImageSearchService> _logger;

    public ImageSearchService(
        IConfiguration configuration,
        IModel3DService model3DService,
        ILogger<ImageSearchService> logger)
    {
        var endpoint = configuration["AzureComputerVision:Endpoint"];
        var key = configuration["AzureComputerVision:Key"];
        
        _visionClient = new ComputerVisionClient(
            new ApiKeyServiceClientCredentials(key))
        {
            Endpoint = endpoint
        };
        
        _model3DService = model3DService;
        _logger = logger;
    }

    public async Task<List<Model3DDto>> SearchByImageAsync(Stream imageStream)
    {
        try
        {
            // Analyse de l'image
            var features = new List<VisualFeatureTypes?>
            {
                VisualFeatureTypes.Objects,
                VisualFeatureTypes.Tags,
                VisualFeatureTypes.Description
            };

            var analysis = await _visionClient.AnalyzeImageInStreamAsync(
                imageStream, 
                visualFeatures: features);

            // Extraction des tags et objets détectés
            var searchTerms = new List<string>();
            
            if (analysis.Description?.Tags != null)
                searchTerms.AddRange(analysis.Description.Tags);
            
            if (analysis.Tags != null)
                searchTerms.AddRange(analysis.Tags.Select(t => t.Name));

            if (analysis.Objects != null)
                searchTerms.AddRange(analysis.Objects.Select(o => o.ObjectProperty));

            // Recherche dans la base de données
            var combinedQuery = string.Join(" ", searchTerms.Distinct());
            var results = await _model3DService.SearchAsync(combinedQuery);

            return results;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during image search");
            throw;
        }
    }
}
```

#### 2.4.2 Service de Compression d'Images

**Toutes les images uploadées doivent être automatiquement compressées** pour optimiser le stockage et les performances.

```csharp
public interface IImageCompressionService
{
    Task<CompressedImageResult> CompressImageAsync(Stream imageStream, string originalFileName);
    Task<CompressedImageResult> CompressAndResizeAsync(Stream imageStream, string originalFileName, ImageSize[] sizes);
}

public class ImageCompressionService : IImageCompressionService
{
    private readonly ILogger<ImageCompressionService> _logger;
    private readonly IBlobStorageService _blobStorage;

    public ImageCompressionService(
        ILogger<ImageCompressionService> logger,
        IBlobStorageService blobStorage)
    {
        _logger = logger;
        _blobStorage = blobStorage;
    }

    /// <summary>
    /// Compresse une image et génère plusieurs résolutions
    /// </summary>
    public async Task<CompressedImageResult> CompressAndResizeAsync(
        Stream imageStream, 
        string originalFileName, 
        ImageSize[] sizes)
    {
        try
        {
            using var image = await Image.LoadAsync(imageStream);
            
            var result = new CompressedImageResult
            {
                OriginalFileName = originalFileName,
                OriginalSize = imageStream.Length,
                Versions = new List<ImageVersion>()
            };

            foreach (var size in sizes)
            {
                var resizedImage = image.Clone(ctx =>
                {
                    // Redimensionner si l'image est plus grande que la taille cible
                    if (image.Width > size.MaxWidth || image.Height > size.MaxHeight)
                    {
                        ctx.Resize(new ResizeOptions
                        {
                            Size = new Size(size.MaxWidth, size.MaxHeight),
                            Mode = ResizeMode.Max,
                            Sampler = KnownResamplers.Lanczos3
                        });
                    }
                });

                // Compression en WebP (format optimal)
                var webpStream = new MemoryStream();
                await resizedImage.SaveAsWebpAsync(webpStream, new WebpEncoder
                {
                    Quality = size.Quality,
                    FileFormat = WebpFileFormatType.Lossy
                });
                webpStream.Position = 0;

                var webpUrl = await _blobStorage.UploadAsync(
                    webpStream, 
                    $"{Guid.NewGuid()}.webp", 
                    "image/webp");

                // Fallback JPG pour compatibilité navigateurs anciens
                var jpgStream = new MemoryStream();
                await resizedImage.SaveAsJpegAsync(jpgStream, new JpegEncoder
                {
                    Quality = size.Quality
                });
                jpgStream.Position = 0;

                var jpgUrl = await _blobStorage.UploadAsync(
                    jpgStream, 
                    $"{Guid.NewGuid()}.jpg", 
                    "image/jpeg");

                result.Versions.Add(new ImageVersion
                {
                    Type = size.Type,
                    Width = resizedImage.Width,
                    Height = resizedImage.Height,
                    WebPUrl = webpUrl,
                    JpegUrl = jpgUrl,
                    CompressedSize = webpStream.Length
                });

                _logger.LogInformation(
                    "Image compressed: {Type}, Original: {OriginalSize}KB, WebP: {CompressedSize}KB, " +
                    "Compression ratio: {Ratio}%",
                    size.Type,
                    imageStream.Length / 1024,
                    webpStream.Length / 1024,
                    ((1 - (double)webpStream.Length / imageStream.Length) * 100).ToString("F1"));
            }

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error compressing image {FileName}", originalFileName);
            throw;
        }
    }

    /// <summary>
    /// Compression simple sans redimensionnement
    /// </summary>
    public async Task<CompressedImageResult> CompressImageAsync(Stream imageStream, string originalFileName)
    {
        var sizes = new[]
        {
            new ImageSize { Type = "original", MaxWidth = 2048, MaxHeight = 2048, Quality = 80 }
        };

        return await CompressAndResizeAsync(imageStream, originalFileName, sizes);
    }
}

// DTOs pour la compression
public class CompressedImageResult
{
    public string OriginalFileName { get; set; }
    public long OriginalSize { get; set; }
    public List<ImageVersion> Versions { get; set; }
}

public class ImageVersion
{
    public string Type { get; set; } // "thumbnail", "preview", "full"
    public int Width { get; set; }
    public int Height { get; set; }
    public string WebPUrl { get; set; }
    public string JpegUrl { get; set; }
    public long CompressedSize { get; set; }
}

public class ImageSize
{
    public string Type { get; set; }
    public int MaxWidth { get; set; }
    public int MaxHeight { get; set; }
    public int Quality { get; set; } // 0-100
}

// Utilisation dans le controller
[HttpPost("upload")]
[RequestSizeLimit(10_485_760)] // 10 MB
public async Task<IActionResult> UploadImage([FromForm] IFormFile image)
{
    if (image == null || image.Length == 0)
        return BadRequest("Image is required");

    try
    {
        using var stream = image.OpenReadStream();
        
        // Définir les tailles nécessaires
        var sizes = new[]
        {
            new ImageSize { Type = "thumbnail", MaxWidth = 200, MaxHeight = 200, Quality = 70 },
            new ImageSize { Type = "preview", MaxWidth = 800, MaxHeight = 800, Quality = 80 },
            new ImageSize { Type = "full", MaxWidth = 2048, MaxHeight = 2048, Quality = 85 }
        };

        var result = await _imageCompressionService.CompressAndResizeAsync(
            stream, 
            image.FileName, 
            sizes);

        return Ok(new
        {
            message = "Image uploaded and compressed successfully",
            originalSize = $"{result.OriginalSize / 1024}KB",
            versions = result.Versions.Select(v => new
            {
                type = v.Type,
                size = $"{v.Width}x{v.Height}",
                webpUrl = v.WebPUrl,
                jpegUrl = v.JpegUrl,
                compressedSize = $"{v.CompressedSize / 1024}KB"
            })
        });
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error uploading image");
        return StatusCode(500, new { message = "Erreur lors de l'upload de l'image" });
    }
}

// Configuration des packages NuGet requis
// <PackageReference Include="SixLabors.ImageSharp" Version="3.0.0" />
// <PackageReference Include="SixLabors.ImageSharp.Web" Version="3.0.0" />
```

#### 2.4.3 Service d'Analyse de Modèles 3D

```csharp
public class Model3DAnalyzer
{
    public async Task<PrintabilityReport> AnalyzeAsync(string modelFilePath)
    {
        var report = new PrintabilityReport();

        try
        {
            // Chargement du fichier STL
            var mesh = await LoadMeshAsync(modelFilePath);

            // Calcul des dimensions
            var boundingBox = CalculateBoundingBox(mesh);
            report.Width = boundingBox.Width;
            report.Height = boundingBox.Height;
            report.Depth = boundingBox.Depth;

            // Vérification de la taille maximale d'impression (ex: 300x300x400mm)
            report.IsPrintable = boundingBox.Width <= 300 && 
                                 boundingBox.Depth <= 300 && 
                                 boundingBox.Height <= 400;

            // Calcul du volume
            report.Volume = CalculateVolume(mesh);

            // Analyse structurelle
            report.HasUnsupportedOverhangs = DetectOverhangs(mesh);
            report.MinWallThickness = CalculateMinWallThickness(mesh);
            
            // Vérification épaisseur minimale (1mm recommandé)
            if (report.MinWallThickness < 1.0)
            {
                report.Warnings.Add("Épaisseur de paroi inférieure à 1mm détectée");
            }

            // Matériaux compatibles
            report.CompatibleMaterials = DetermineCompatibleMaterials(report);

            // Estimation du temps d'impression (simplifié)
            report.EstimatedPrintTime = EstimatePrintTime(report.Volume, PrintQuality.Standard);

            // Estimation du coût
            report.EstimatedCost = CalculateCost(report.Volume, report.CompatibleMaterials.First());

            return report;
        }
        catch (Exception ex)
        {
            report.IsPrintable = false;
            report.Errors.Add($"Erreur lors de l'analyse: {ex.Message}");
            return report;
        }
    }

    private async Task<Mesh> LoadMeshAsync(string filePath)
    {
        // Utilisation d'une librairie comme OpenCascade ou custom parser
        // Implémentation simplifiée
        return await Task.FromResult(new Mesh());
    }

    private BoundingBox CalculateBoundingBox(Mesh mesh)
    {
        // Calcul du bounding box
        return new BoundingBox { Width = 100, Height = 150, Depth = 100 };
    }

    private double CalculateVolume(Mesh mesh)
    {
        // Calcul du volume en cm³
        return 250.0;
    }

    private bool DetectOverhangs(Mesh mesh)
    {
        // Détection des surplombs > 45°
        return false;
    }

    private double CalculateMinWallThickness(Mesh mesh)
    {
        // Calcul de l'épaisseur minimale des parois
        return 1.2; // mm
    }

    private List<string> DetermineCompatibleMaterials(PrintabilityReport report)
    {
        var materials = new List<string> { "PLA", "ABS", "PETG" };
        
        if (report.MinWallThickness >= 2.0)
            materials.Add("TPU");
        
        if (report.Volume < 100)
            materials.Add("Résine");

        return materials;
    }

    private TimeSpan EstimatePrintTime(double volume, PrintQuality quality)
    {
        // Estimation simplifiée: ~1h pour 50cm³ en qualité standard
        var baseTime = (volume / 50.0) * 60; // minutes
        
        var multiplier = quality switch
        {
            PrintQuality.Draft => 0.7,
            PrintQuality.Standard => 1.0,
            PrintQuality.HighQuality => 1.8,
            _ => 1.0
        };

        return TimeSpan.FromMinutes(baseTime * multiplier);
    }

    private decimal CalculateCost(double volume, string material)
    {
        // Densité PLA: ~1.24 g/cm³
        var density = 1.24;
        var weight = volume * density; // grammes
        
        var materialCostPerGram = material switch
        {
            "PLA" => 0.025m,
            "ABS" => 0.030m,
            "PETG" => 0.035m,
            "TPU" => 0.050m,
            "Résine" => 0.080m,
            _ => 0.025m
        };

        var materialCost = (decimal)weight * materialCostPerGram;
        var laborCost = 5.0m; // Coût fixe
        var marginCost = materialCost * 0.3m; // Marge 30%

        return materialCost + laborCost + marginCost;
    }
}

public class PrintabilityReport
{
    public bool IsPrintable { get; set; }
    public double Width { get; set; }
    public double Height { get; set; }
    public double Depth { get; set; }
    public double Volume { get; set; }
    public double MinWallThickness { get; set; }
    public bool HasUnsupportedOverhangs { get; set; }
    public List<string> CompatibleMaterials { get; set; } = new();
    public TimeSpan EstimatedPrintTime { get; set; }
    public decimal EstimatedCost { get; set; }
    public List<string> Warnings { get; set; } = new();
    public List<string> Errors { get; set; } = new();
}
```

#### 2.4.3 Service de Notification Email pour l'Imprimeur

```csharp
public interface IEmailNotificationService
{
    Task SendNewOrderNotificationToAdminAsync(Order order, User customer);
    Task SendOrderStatusUpdateToCustomerAsync(Order order, User customer);
}

public class EmailNotificationService : IEmailNotificationService
{
    private readonly SendGridClient _sendGridClient;
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailNotificationService> _logger;

    public EmailNotificationService(
        IConfiguration configuration,
        ILogger<EmailNotificationService> logger)
    {
        _configuration = configuration;
        _logger = logger;
        
        var apiKey = configuration["SendGrid:ApiKey"];
        _sendGridClient = new SendGridClient(apiKey);
    }

    /// <summary>
    /// Envoie un email de notification à l'administrateur/imprimeur 
    /// lorsqu'une nouvelle commande est reçue
    /// </summary>
    public async Task SendNewOrderNotificationToAdminAsync(Order order, User customer)
    {
        try
        {
            var adminEmail = _configuration["SendGrid:AdminEmail"];
            var fromEmail = _configuration["SendGrid:FromEmail"];
            var fromName = _configuration["SendGrid:FromName"];

            var subject = $"🔔 Nouvelle commande #{order.OrderNumber}";
            
            var htmlContent = $@"
                <html>
                <body style='font-family: Arial, sans-serif;'>
                    <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                        <h2 style='color: #4F46E5;'>Nouvelle Commande d'Impression 3D</h2>
                        
                        <div style='background-color: #F3F4F6; padding: 15px; border-radius: 8px; margin: 20px 0;'>
                            <h3>📋 Détails de la Commande</h3>
                            <p><strong>Référence :</strong> {order.OrderNumber}</p>
                            <p><strong>Date :</strong> {order.CreatedAt:dd/MM/yyyy à HH:mm}</p>
                            <p><strong>Modèle :</strong> {order.Model.Name}</p>
                            <p><strong>Matériau :</strong> {order.Material.Name}</p>
                            <p><strong>Couleur :</strong> {order.Color}</p>
                            <p><strong>Qualité :</strong> {order.Quality}</p>
                            <p><strong>Prix Total :</strong> {order.TotalCost:C}</p>
                        </div>

                        <div style='background-color: #EFF6FF; padding: 15px; border-radius: 8px; margin: 20px 0;'>
                            <h3>👤 Informations Client</h3>
                            <p><strong>Nom :</strong> {customer.FirstName} {customer.LastName}</p>
                            <p><strong>Email :</strong> {customer.Email}</p>
                            <p><strong>Adresse de livraison :</strong><br/>{order.ShippingAddress}</p>
                        </div>

                        <div style='margin: 30px 0;'>
                            <a href='https://app.print3dfinder.com/admin/orders/{order.Id}' 
                               style='background-color: #4F46E5; color: white; padding: 12px 24px; 
                                      text-decoration: none; border-radius: 6px; display: inline-block;'>
                                📊 Voir la commande dans le tableau de bord
                            </a>
                        </div>

                        <hr style='margin: 30px 0; border: none; border-top: 1px solid #E5E7EB;'/>
                        
                        <p style='color: #6B7280; font-size: 12px;'>
                            Cette notification a été envoyée automatiquement par Print3D Finder.
                        </p>
                    </div>
                </body>
                </html>
            ";

            var plainTextContent = $@"
                Nouvelle Commande d'Impression 3D
                
                Référence: {order.OrderNumber}
                Date: {order.CreatedAt:dd/MM/yyyy à HH:mm}
                Modèle: {order.Model.Name}
                Matériau: {order.Material.Name}
                Couleur: {order.Color}
                Qualité: {order.Quality}
                Prix Total: {order.TotalCost:C}
                
                Client: {customer.FirstName} {customer.LastName}
                Email: {customer.Email}
                Adresse: {order.ShippingAddress}
                
                Voir la commande: https://app.print3dfinder.com/admin/orders/{order.Id}
            ";

            var msg = MailHelper.CreateSingleEmail(
                new EmailAddress(fromEmail, fromName),
                new EmailAddress(adminEmail),
                subject,
                plainTextContent,
                htmlContent
            );

            var response = await _sendGridClient.SendEmailAsync(msg);

            if (response.StatusCode == System.Net.HttpStatusCode.Accepted || 
                response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                _logger.LogInformation(
                    "Email de notification envoyé avec succès pour la commande {OrderNumber}", 
                    order.OrderNumber);
            }
            else
            {
                _logger.LogWarning(
                    "Échec de l'envoi de l'email pour la commande {OrderNumber}. Status: {StatusCode}", 
                    order.OrderNumber, 
                    response.StatusCode);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, 
                "Erreur lors de l'envoi de l'email de notification pour la commande {OrderNumber}", 
                order.OrderNumber);
            // Ne pas bloquer la création de commande si l'email échoue
        }
    }

    /// <summary>
    /// Envoie un email au client lorsque le statut de sa commande change
    /// </summary>
    public async Task SendOrderStatusUpdateToCustomerAsync(Order order, User customer)
    {
        try
        {
            var fromEmail = _configuration["SendGrid:FromEmail"];
            var fromName = _configuration["SendGrid:FromName"];

            var statusText = order.Status switch
            {
                OrderStatus.PendingValidation => "En attente de validation",
                OrderStatus.InPreparation => "En cours de préparation",
                OrderStatus.Printing => "En impression",
                OrderStatus.PostProcessing => "Post-traitement en cours",
                OrderStatus.ReadyToShip => "Prêt à l'expédition",
                OrderStatus.Shipped => "Expédié",
                OrderStatus.Delivered => "Livré",
                _ => "Mis à jour"
            };

            var subject = $"📦 Commande #{order.OrderNumber} - {statusText}";
            
            var htmlContent = $@"
                <html>
                <body style='font-family: Arial, sans-serif;'>
                    <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                        <h2 style='color: #4F46E5;'>Mise à Jour de Votre Commande</h2>
                        
                        <p>Bonjour {customer.FirstName},</p>
                        
                        <p>Votre commande <strong>#{order.OrderNumber}</strong> a été mise à jour.</p>
                        
                        <div style='background-color: #F3F4F6; padding: 15px; border-radius: 8px; margin: 20px 0;'>
                            <h3>📋 Statut Actuel</h3>
                            <p style='font-size: 18px; color: #4F46E5;'><strong>{statusText}</strong></p>
                            <p><strong>Modèle :</strong> {order.Model.Name}</p>
                        </div>

                        <div style='margin: 30px 0;'>
                            <a href='https://app.print3dfinder.com/orders/{order.Id}' 
                               style='background-color: #4F46E5; color: white; padding: 12px 24px; 
                                      text-decoration: none; border-radius: 6px; display: inline-block;'>
                                📊 Suivre ma commande
                            </a>
                        </div>

                        <p style='color: #6B7280;'>
                            Merci de votre confiance !<br/>
                            L'équipe Print3D Finder
                        </p>
                    </div>
                </body>
                </html>
            ";

            var msg = MailHelper.CreateSingleEmail(
                new EmailAddress(fromEmail, fromName),
                new EmailAddress(customer.Email, $"{customer.FirstName} {customer.LastName}"),
                subject,
                $"Votre commande #{order.OrderNumber} est maintenant : {statusText}",
                htmlContent
            );

            await _sendGridClient.SendEmailAsync(msg);

            _logger.LogInformation(
                "Email de mise à jour envoyé au client pour la commande {OrderNumber}", 
                order.OrderNumber);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, 
                "Erreur lors de l'envoi de l'email au client pour la commande {OrderNumber}", 
                order.OrderNumber);
        }
    }
}

// Utilisation dans OrderService
public class OrderService : IOrderService
{
    private readonly ApplicationDbContext _context;
    private readonly IEmailNotificationService _emailService;
    private readonly ILogger<OrderService> _logger;

    public OrderService(
        ApplicationDbContext context,
        IEmailNotificationService emailService,
        ILogger<OrderService> logger)
    {
        _context = context;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<Order> CreateOrderAsync(CreateOrderRequest request)
    {
        var order = new Order
        {
            Id = Guid.NewGuid(),
            OrderNumber = GenerateOrderNumber(),
            UserId = request.UserId,
            ModelId = request.ModelId,
            MaterialId = request.MaterialId,
            Color = request.Color,
            Quality = request.Quality,
            Status = OrderStatus.PendingValidation,
            CreatedAt = DateTime.UtcNow,
            // ... autres propriétés
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        // Charger les relations pour l'email
        await _context.Entry(order)
            .Reference(o => o.Model)
            .LoadAsync();
        await _context.Entry(order)
            .Reference(o => o.Material)
            .LoadAsync();
        await _context.Entry(order)
            .Reference(o => o.User)
            .LoadAsync();

        // ⚡ Envoi automatique de l'email à l'imprimeur
        await _emailService.SendNewOrderNotificationToAdminAsync(order, order.User);

        _logger.LogInformation(
            "Nouvelle commande créée : {OrderNumber} par {UserId}", 
            order.OrderNumber, 
            request.UserId);

        return order;
    }

    public async Task UpdateOrderStatusAsync(Guid orderId, OrderStatus newStatus)
    {
        var order = await _context.Orders
            .Include(o => o.User)
            .Include(o => o.Model)
            .FirstOrDefaultAsync(o => o.Id == orderId);

        if (order == null)
            throw new NotFoundException("Commande introuvable");

        order.Status = newStatus;
        await _context.SaveChangesAsync();

        // Notification au client
        await _emailService.SendOrderStatusUpdateToCustomerAsync(order, order.User);

        _logger.LogInformation(
            "Commande {OrderNumber} mise à jour : {Status}", 
            order.OrderNumber, 
            newStatus);
    }

    private string GenerateOrderNumber()
    {
        return $"REF-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString()[..8].ToUpper()}";
    }
}
```

## 3. Sécurité

### 3.1 Chiffrement des Noms d'Utilisateurs

```csharp
public class UserEncryptionService
{
    private readonly string _encryptionKey;

    public UserEncryptionService(IConfiguration configuration)
    {
        _encryptionKey = configuration["Security:EncryptionKey"];
    }

    public string EncryptUsername(string username)
    {
        using var aes = Aes.Create();
        aes.Key = Encoding.UTF8.GetBytes(_encryptionKey);
        aes.GenerateIV();

        using var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
        using var ms = new MemoryStream();
        
        ms.Write(aes.IV, 0, aes.IV.Length);
        
        using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
        using (var sw = new StreamWriter(cs))
        {
            sw.Write(username);
        }

        return Convert.ToBase64String(ms.ToArray());
    }

    public string DecryptUsername(string encryptedUsername)
    {
        var buffer = Convert.FromBase64String(encryptedUsername);

        using var aes = Aes.Create();
        aes.Key = Encoding.UTF8.GetBytes(_encryptionKey);

        var iv = new byte[aes.IV.Length];
        Array.Copy(buffer, 0, iv, 0, iv.Length);
        aes.IV = iv;

        using var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
        using var ms = new MemoryStream(buffer, iv.Length, buffer.Length - iv.Length);
        using var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read);
        using var sr = new StreamReader(cs);

        return sr.ReadToEnd();
    }
}
```

### 3.2 Configuration appsettings.json (Production)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=xxxxx;Database=print3dfinder;Username=xxxxx;Password=xxxxx",
    "Redis": "xxxxx.redis.cache.windows.net:6380,password=xxxxx,ssl=True"
  },
  "JwtSettings": {
    "SecretKey": "YOUR_SUPER_SECRET_KEY_HERE_AT_LEAST_32_CHARACTERS",
    "Issuer": "Print3DFinderAPI",
    "Audience": "Print3DFinderClients",
    "ExpiryMinutes": 60,
    "RefreshTokenExpiryDays": 30
  },
  "Security": {
    "EncryptionKey": "32_CHARACTER_ENCRYPTION_KEY_HERE"
  },
  "AzureComputerVision": {
    "Endpoint": "https://xxxxx.cognitiveservices.azure.com/",
    "Key": "xxxxx"
  },
  "BlobStorage": {
    "ConnectionString": "DefaultEndpointsProtocol=https;AccountName=xxxxx;AccountKey=xxxxx",
    "ContainerName": "models3d"
  },
  "Elasticsearch": {
    "Uri": "https://xxxxx.es.eastus.azure.elastic-cloud.com:9243",
    "Username": "elastic",
    "Password": "xxxxx"
  },
  "SendGrid": {
    "ApiKey": "SG.xxxxx",
    "FromEmail": "noreply@print3dfinder.com",
    "FromName": "Print3D Finder",
    "AdminEmail": "admin@print3dfinder.com"
  },
  "Firebase": {
    "ServerKey": "xxxxx",
    "SenderId": "xxxxx"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

## 4. Déploiement

### 4.1 Azure App Service (Recommandé)

```yaml
# azure-pipelines.yml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

variables:
  buildConfiguration: 'Release'

stages:
- stage: Build
  jobs:
  - job: Build
    steps:
    - task: UseDotNet@2
      inputs:
        version: '10.x'
    
    - task: DotNetCoreCLI@2
      displayName: 'Restore dependencies'
      inputs:
        command: 'restore'
        projects: '**/*.csproj'
    
    - task: DotNetCoreCLI@2
      displayName: 'Build'
      inputs:
        command: 'build'
        projects: '**/*.csproj'
        arguments: '--configuration $(buildConfiguration)'
    
    - task: DotNetCoreCLI@2
      displayName: 'Run tests'
      inputs:
        command: 'test'
        projects: '**/*Tests.csproj'
    
    - task: DotNetCoreCLI@2
      displayName: 'Publish'
      inputs:
        command: 'publish'
        publishWebProjects: true
        arguments: '--configuration $(buildConfiguration) --output $(Build.ArtifactStagingDirectory)'
    
    - task: PublishBuildArtifacts@1
      inputs:
        pathToPublish: '$(Build.ArtifactStagingDirectory)'
        artifactName: 'drop'

- stage: Deploy
  dependsOn: Build
  jobs:
  - deployment: Deploy
    environment: 'Production'
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureWebApp@1
            inputs:
              azureSubscription: 'Azure-Subscription'
              appName: 'print3dfinder-api'
              package: '$(Pipeline.Workspace)/drop/**/*.zip'
```

### 4.2 Docker (Alternative)

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["Print3DFinder.Api/Print3DFinder.Api.csproj", "Print3DFinder.Api/"]
RUN dotnet restore "Print3DFinder.Api/Print3DFinder.Api.csproj"
COPY . .
WORKDIR "/src/Print3DFinder.Api"
RUN dotnet build "Print3DFinder.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Print3DFinder.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Print3DFinder.Api.dll"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "5000:80"
      - "5001:443"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__DefaultConnection=Host=postgres;Database=print3dfinder;Username=postgres;Password=yourpassword
      - ConnectionStrings__Redis=redis:6379
    depends_on:
      - postgres
      - redis
    networks:
      - print3dfinder-network

  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=print3dfinder
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=yourpassword
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - print3dfinder-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - print3dfinder-network

volumes:
  postgres-data:

networks:
  print3dfinder-network:
    driver: bridge
```

## 5. Monitoring et Observabilité

### 5.1 Application Insights (Azure)

```csharp
// Configuration dans Program.cs
builder.Services.AddApplicationInsightsTelemetry(options =>
{
    options.ConnectionString = builder.Configuration["ApplicationInsights:ConnectionString"];
});

// Logging personnalisé
public class OrderService : IOrderService
{
    private readonly ILogger<OrderService> _logger;
    private readonly TelemetryClient _telemetryClient;

    public async Task<Order> CreateOrderAsync(CreateOrderRequest request)
    {
        var startTime = DateTime.UtcNow;
        var timer = System.Diagnostics.Stopwatch.StartNew();

        try
        {
            // Logique de création de commande
            var order = // ...

            timer.Stop();
            
            // Tracking custom event
            _telemetryClient.TrackEvent("OrderCreated", new Dictionary<string, string>
            {
                { "OrderId", order.Id.ToString() },
                { "UserId", request.UserId },
                { "Material", request.Material }
            });

            // Tracking metric
            _telemetryClient.TrackMetric("OrderCreationTime", timer.ElapsedMilliseconds);

            _logger.LogInformation("Order {OrderId} created successfully in {Duration}ms", 
                order.Id, timer.ElapsedMilliseconds);

            return order;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating order for user {UserId}", request.UserId);
            
            _telemetryClient.TrackException(ex, new Dictionary<string, string>
            {
                { "UserId", request.UserId },
                { "Operation", "CreateOrder" }
            });

            throw;
        }
    }
}
```

### 5.2 Sécurité des Logs - Protection des Credentials

**IMPORTANT** : Les credentials (mots de passe, tokens, clés API) ne doivent **JAMAIS** apparaître dans les logs.

```csharp
// Middleware de filtrage des logs sensibles
public class SensitiveDataLoggingFilter : ILogger
{
    private readonly ILogger _innerLogger;
    private readonly string[] _sensitiveFields = new[]
    {
        "password", "token", "apikey", "secret", "credential",
        "authorization", "api-key", "bearer"
    };

    public void Log<TState>(
        LogLevel logLevel,
        EventId eventId,
        TState state,
        Exception exception,
        Func<TState, Exception, string> formatter)
    {
        if (state == null) return;

        var message = formatter(state, exception);
        var sanitizedMessage = SanitizeMessage(message);

        _innerLogger.Log(logLevel, eventId, sanitizedMessage, exception, 
            (m, ex) => m.ToString());
    }

    private string SanitizeMessage(string message)
    {
        if (string.IsNullOrEmpty(message)) return message;

        // Masquer les credentials dans les requêtes HTTP
        message = Regex.Replace(message, 
            @"(password|token|apikey|secret|authorization)[\s]*[:=][\s]*[^\s&,]+", 
            "$1=***REDACTED***", 
            RegexOptions.IgnoreCase);

        // Masquer les emails partiellement
        message = Regex.Replace(message,
            @"([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})",
            m => $"{m.Groups[1].Value[0]}***@{m.Groups[2].Value}");

        return message;
    }
}

// Configuration dans Program.cs
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddFilter<SensitiveDataLoggingFilter>((category, level) => level >= LogLevel.Information);

// Configuration Serilog avec enrichissement sécurisé
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .MinimumLevel.Override("Microsoft", LogLevel.Warning)
    .Enrich.FromLogContext()
    .Enrich.WithMachineName()
    .Enrich.WithEnvironmentName()
    .Destructure.ByTransforming<User>(u => new 
    { 
        Id = u.Id,
        Email = MaskEmail(u.Email),
        // NE PAS inclure PasswordHash, Tokens, etc.
    })
    .WriteTo.Console(outputTemplate: 
        "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}")
    .WriteTo.File(
        path: "logs/app-.txt",
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 30,
        outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}")
    .CreateLogger();

builder.Host.UseSerilog();

// Méthode utilitaire pour masquer les emails
string MaskEmail(string email)
{
    if (string.IsNullOrEmpty(email)) return email;
    var parts = email.Split('@');
    if (parts.Length != 2) return email;
    
    var localPart = parts[0];
    var maskedLocal = localPart.Length > 2 
        ? $"{localPart[0]}***{localPart[^1]}" 
        : "***";
    
    return $"{maskedLocal}@{parts[1]}";
}

// Exemple de logging sécurisé dans AuthController
[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginRequest request)
{
    try
    {
        // ❌ JAMAIS FAIRE CECI:
        // _logger.LogInformation("Login attempt with password: {Password}", request.Password);
        
        // ✅ BON:
        _logger.LogInformation("Login attempt for user: {Email}", MaskEmail(request.Email));

        var result = await _authService.LoginAsync(request.Email, request.Password);
        
        if (!result.Success)
        {
            // Ne pas révéler si l'email existe ou non
            _logger.LogWarning("Failed login attempt for: {Email}", MaskEmail(request.Email));
            return Unauthorized(new { message = "Email ou mot de passe incorrect" });
        }

        // Ne pas logger les tokens
        _logger.LogInformation("Successful login for user: {UserId}", result.UserId);
        
        return Ok(new { token = result.Token, refreshToken = result.RefreshToken });
    }
    catch (Exception ex)
    {
        // Logger l'exception sans détails sensibles
        _logger.LogError(ex, "Error during login process");
        return StatusCode(500, new { message = "Une erreur est survenue lors de la connexion" });
    }
}

// Configuration des exclusions dans appsettings.json
{
  "Serilog": {
    "Using": [ "Serilog.Sinks.Console", "Serilog.Sinks.File" ],
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    },
    "Properties": {
      "Application": "Print3DFinder"
    },
    "Destructure": [
      {
        "Name": "ToMaximumDepth",
        "Args": { "maximumDestructuringDepth": 3 }
      },
      {
        "Name": "ToMaximumStringLength",
        "Args": { "maximumStringLength": 1000 }
      }
    ],
    "Filter": [
      {
        "Name": "ByExcluding",
        "Args": {
          "expression": "@Properties['password'] is not null or @Properties['token'] is not null"
        }
      }
    ]
  }
}
```

### 5.3 Gestion des Messages d'Erreur Explicites

Messages d'erreur clairs et actionnables pour les utilisateurs :

```csharp
// Classe de réponse d'erreur standardisée
public class ApiErrorResponse
{
    public string Message { get; set; }
    public string ErrorCode { get; set; }
    public Dictionary<string, string[]> ValidationErrors { get; set; }
    public string TraceId { get; set; } // Pour support technique
}

// Middleware de gestion globale des erreurs
public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlingMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ErrorHandlingMiddleware(
        RequestDelegate next,
        ILogger<ErrorHandlingMiddleware> logger,
        IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var traceId = context.TraceIdentifier;
        
        // Log technique complet (sans credentials)
        _logger.LogError(exception, 
            "Unhandled exception occurred. TraceId: {TraceId}", traceId);

        // Préparer la réponse pour l'utilisateur
        var response = new ApiErrorResponse
        {
            TraceId = traceId
        };

        context.Response.ContentType = "application/json";

        switch (exception)
        {
            case ValidationException validationEx:
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                response.Message = "Les données fournies sont invalides";
                response.ErrorCode = "VALIDATION_ERROR";
                response.ValidationErrors = validationEx.Errors
                    .GroupBy(e => e.PropertyName)
                    .ToDictionary(
                        g => g.Key,
                        g => g.Select(e => e.ErrorMessage).ToArray()
                    );
                break;

            case UnauthorizedAccessException:
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                response.Message = "Vous devez être connecté pour accéder à cette ressource";
                response.ErrorCode = "UNAUTHORIZED";
                break;

            case NotFoundException notFoundEx:
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                response.Message = $"La ressource demandée n'a pas été trouvée : {notFoundEx.ResourceName}";
                response.ErrorCode = "NOT_FOUND";
                break;

            case InvalidOperationException invalidOpEx:
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                response.Message = GetUserFriendlyMessage(invalidOpEx);
                response.ErrorCode = "INVALID_OPERATION";
                break;

            case DbUpdateException dbEx:
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                response.Message = "Une erreur est survenue lors de l'enregistrement des données. Veuillez réessayer.";
                response.ErrorCode = "DATABASE_ERROR";
                // Ne pas exposer les détails SQL à l'utilisateur
                break;

            default:
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                response.Message = "Une erreur temporaire s'est produite. Notre équipe a été notifiée. Veuillez réessayer dans quelques instants.";
                response.ErrorCode = "INTERNAL_ERROR";
                
                if (_env.IsDevelopment())
                {
                    response.Message += $" Détails: {exception.Message}";
                }
                break;
        }

        await context.Response.WriteAsJsonAsync(response);
    }

    private string GetUserFriendlyMessage(InvalidOperationException ex)
    {
        // Mapper les messages techniques en messages utilisateur
        return ex.Message switch
        {
            var msg when msg.Contains("duplicate key") => 
                "Cette ressource existe déjà dans le système",
            
            var msg when msg.Contains("foreign key") => 
                "Impossible de supprimer cette ressource car elle est utilisée ailleurs",
            
            var msg when msg.Contains("timeout") => 
                "L'opération a pris trop de temps. Veuillez réessayer",
            
            _ => "L'opération demandée ne peut pas être effectuée actuellement"
        };
    }
}

// Exemple de validation avec messages explicites
public class CreateOrderRequestValidator : AbstractValidator<CreateOrderRequest>
{
    public CreateOrderRequestValidator()
    {
        RuleFor(x => x.ModelId)
            .NotEmpty()
            .WithMessage("Vous devez sélectionner un modèle 3D à imprimer");

        RuleFor(x => x.MaterialId)
            .NotEmpty()
            .WithMessage("Vous devez choisir un matériau d'impression");

        RuleFor(x => x.Color)
            .NotEmpty()
            .WithMessage("Veuillez sélectionner une couleur")
            .MaximumLength(50)
            .WithMessage("Le nom de la couleur ne doit pas dépasser 50 caractères");

        RuleFor(x => x.ShippingAddress)
            .NotEmpty()
            .WithMessage("L'adresse de livraison est obligatoire")
            .MinimumLength(10)
            .WithMessage("L'adresse de livraison doit contenir au moins 10 caractères")
            .MaximumLength(500)
            .WithMessage("L'adresse de livraison ne doit pas dépasser 500 caractères");
    }
}

// Utilisation dans un controller
[HttpPost]
public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
{
    var validator = new CreateOrderRequestValidator();
    var validationResult = await validator.ValidateAsync(request);

    if (!validationResult.IsValid)
    {
        var errors = validationResult.Errors
            .GroupBy(e => e.PropertyName)
            .ToDictionary(
                g => g.Key,
                g => g.Select(e => e.ErrorMessage).ToArray()
            );

        return BadRequest(new ApiErrorResponse
        {
            Message = "Les données de la commande sont invalides",
            ErrorCode = "VALIDATION_ERROR",
            ValidationErrors = errors,
            TraceId = HttpContext.TraceIdentifier
        });
    }

    // Traiter la commande...
}
```

### 6.1 Tests Unitaires

```csharp
public class Model3DServiceTests
{
    private readonly Mock<ApplicationDbContext> _mockContext;
    private readonly Mock<ILogger<Model3DService>> _mockLogger;
    private readonly Model3DService _service;

    public Model3DServiceTests()
    {
        _mockContext = new Mock<ApplicationDbContext>();
        _mockLogger = new Mock<ILogger<Model3DService>>();
        _service = new Model3DService(_mockContext.Object, _mockLogger.Object);
    }

    [Fact]
    public async Task SearchAsync_WithValidQuery_ReturnsResults()
    {
        // Arrange
        var query = "vase";
        var expectedModels = new List<Model3D>
        {
            new Model3D { Id = Guid.NewGuid(), Name = "Modern Vase", Description = "A beautiful vase" }
        };

        _mockContext.Setup(c => c.Models.Where(It.IsAny<Expression<Func<Model3D, bool>>>()))
            .Returns(expectedModels.AsQueryable());

        // Act
        var results = await _service.SearchAsync(query);

        // Assert
        Assert.NotNull(results);
        Assert.Single(results);
        Assert.Contains("vase", results[0].Name, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task AnalyzePrintabilityAsync_WithLargeModel_ReturnsNotPrintable()
    {
        // Arrange
        var modelId = Guid.NewGuid();
        // ... Setup mock

        // Act
        var report = await _service.AnalyzePrintabilityAsync(modelId.ToString());

        // Assert
        Assert.NotNull(report);
        Assert.False(report.IsPrintable);
        Assert.Contains("trop grand", report.Warnings[0], StringComparison.OrdinalIgnoreCase);
    }
}
```

### 6.2 Tests d'Intégration

```csharp
public class ModelsControllerIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public ModelsControllerIntegrationTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Search_WithValidToken_ReturnsOk()
    {
        // Arrange
        var token = await GetAuthTokenAsync();
        _client.DefaultRequestHeaders.Authorization = 
            new AuthenticationHeaderValue("Bearer", token);

        // Act
        var response = await _client.GetAsync("/api/models/search?query=vase");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.NotEmpty(content);
    }

    private async Task<string> GetAuthTokenAsync()
    {
        var loginRequest = new { Email = "test@test.com", Password = "Test123!" };
        var response = await _client.PostAsJsonAsync("/api/auth/login", loginRequest);
        var result = await response.Content.ReadFromJsonAsync<TokenResponse>();
        return result.Token;
    }
}
```

## 7. Standards de Qualité du Code

### 7.1 Configuration .editorconfig

```ini
# EditorConfig is awesome: https://EditorConfig.org

root = true

# All files
[*]
charset = utf-8
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

# C# files
[*.cs]
indent_size = 4

# Naming conventions
dotnet_naming_rule.interfaces_should_be_prefixed_with_i.severity = warning
dotnet_naming_rule.interfaces_should_be_prefixed_with_i.symbols = interface
dotnet_naming_rule.interfaces_should_be_prefixed_with_i.style = begins_with_i

dotnet_naming_style.begins_with_i.required_prefix = I
dotnet_naming_style.begins_with_i.capitalization = pascal_case

# Code style rules
csharp_prefer_braces = true:warning
csharp_prefer_simple_using_statement = true:suggestion
csharp_prefer_static_local_function = true:suggestion
csharp_style_prefer_switch_expression = true:suggestion

# Modifier order
csharp_preferred_modifier_order = public,private,protected,internal,static,extern,new,virtual,abstract,sealed,override,readonly,unsafe,volatile,async:suggestion

# Expression preferences
dotnet_style_prefer_auto_properties = true:suggestion
dotnet_style_prefer_conditional_expression_over_assignment = true:silent
dotnet_style_prefer_inferred_tuple_names = true:suggestion
dotnet_style_prefer_inferred_anonymous_type_member_names = true:suggestion

# Organize usings
dotnet_sort_system_directives_first = true
dotnet_separate_import_directive_groups = false

# Avoid this. unless necessary
dotnet_style_qualification_for_field = false:suggestion
dotnet_style_qualification_for_property = false:suggestion
dotnet_style_qualification_for_method = false:suggestion
dotnet_style_qualification_for_event = false:suggestion

# Language keywords instead of framework type names
dotnet_style_predefined_type_for_locals_parameters_members = true:suggestion
dotnet_style_predefined_type_for_member_access = true:suggestion

# Parentheses preferences
dotnet_style_parentheses_in_arithmetic_binary_operators = always_for_clarity:silent
dotnet_style_parentheses_in_other_binary_operators = always_for_clarity:silent

# Expression-level preferences
csharp_prefer_simple_default_expression = true:suggestion

# Pattern matching
csharp_style_pattern_matching_over_is_with_cast_check = true:suggestion
csharp_style_pattern_matching_over_as_with_null_check = true:suggestion

# Null checking
csharp_style_throw_expression = true:suggestion
csharp_style_conditional_delegate_call = true:suggestion

# New line preferences
csharp_new_line_before_open_brace = all
csharp_new_line_before_else = true
csharp_new_line_before_catch = true
csharp_new_line_before_finally = true

# Indentation
csharp_indent_case_contents = true
csharp_indent_switch_labels = true

# Space preferences
csharp_space_after_cast = false
csharp_space_after_keywords_in_control_flow_statements = true

# Wrapping
csharp_preserve_single_line_statements = false
csharp_preserve_single_line_blocks = true

# JSON files
[*.json]
indent_size = 2

# YAML files
[*.{yml,yaml}]
indent_size = 2

# XML files
[*.{csproj,xml,config}]
indent_size = 2
```

### 7.2 Configuration StyleCop (Directory.Build.props)

```xml
<Project>
  <PropertyGroup>
    <LangVersion>12.0</LangVersion>
    <Nullable>enable</Nullable>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
    <EnforceCodeStyleInBuild>true</EnforceCodeStyleInBuild>
    <AnalysisMode>All</AnalysisMode>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="StyleCop.Analyzers" Version="1.2.0-beta.556">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="SonarAnalyzer.CSharp" Version="9.16.0.82469">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.CodeAnalysis.NetAnalyzers" Version="8.0.0">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>

  <ItemGroup>
    <AdditionalFiles Include="$(MSBuildThisFileDirectory)stylecop.json" />
  </ItemGroup>
</Project>
```

### 7.3 Configuration SonarQube (sonar-project.properties)

```properties
# SonarQube configuration for Print3D Finder
sonar.projectKey=print3d-finder
sonar.projectName=Print3D Finder
sonar.projectVersion=1.0

# Source code
sonar.sources=src
sonar.tests=tests

# Exclusions
sonar.exclusions=**/Migrations/**,**/obj/**,**/bin/**,**/*.Designer.cs
sonar.test.exclusions=**/*Tests/**

# C# specific
sonar.cs.opencover.reportsPaths=coverage.opencover.xml
sonar.cs.vstest.reportsPaths=TestResults/*.trx

# Quality gate thresholds
sonar.qualitygate.wait=true

# Code coverage
sonar.coverage.exclusions=**/Program.cs,**/Startup.cs,**/*Tests/**

# Duplicate detection
sonar.cpd.exclusions=**/Migrations/**,**/*Dto.cs,**/*Entity.cs
```

### 7.4 Pipeline CI/CD avec Analyse de Qualité

```yaml
# .github/workflows/quality-check.yml
name: Code Quality Check

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  quality:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0  # Shallow clones disabled for better analysis
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '10.0.x'
    
    - name: Restore dependencies
      run: dotnet restore
    
    - name: Build
      run: dotnet build --configuration Release --no-restore
    
    - name: Run tests with coverage
      run: |
        dotnet test --no-build --verbosity normal \
          --configuration Release \
          /p:CollectCoverage=true \
          /p:CoverletOutputFormat=opencover \
          /p:CoverletOutput=./coverage/
    
    - name: Install SonarScanner
      run: dotnet tool install --global dotnet-sonarscanner
    
    - name: Begin SonarQube analysis
      run: |
        dotnet sonarscanner begin \
          /k:"print3d-finder" \
          /d:sonar.host.url="${{ secrets.SONAR_HOST_URL }}" \
          /d:sonar.login="${{ secrets.SONAR_TOKEN }}" \
          /d:sonar.cs.opencover.reportsPaths="**/coverage.opencover.xml"
    
    - name: Build for analysis
      run: dotnet build --configuration Release
    
    - name: End SonarQube analysis
      run: dotnet sonarscanner end /d:sonar.login="${{ secrets.SONAR_TOKEN }}"
    
    - name: Check code coverage threshold
      run: |
        coverage=$(grep -oP 'line-rate="\K[0-9.]+' coverage.opencover.xml | head -1)
        threshold=0.70
        if (( $(echo "$coverage < $threshold" | bc -l) )); then
          echo "Code coverage ($coverage) is below threshold ($threshold)"
          exit 1
        fi
        echo "Code coverage: $coverage (threshold: $threshold) ✓"
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        files: ./coverage/coverage.opencover.xml
        flags: unittests
        name: codecov-umbrella
    
    - name: Check for security vulnerabilities
      run: |
        dotnet list package --vulnerable --include-transitive
        if [ $? -ne 0 ]; then
          echo "Security vulnerabilities detected!"
          exit 1
        fi
```

### 7.5 Exemple de Code Respectant les Standards

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Print3DFinder.Core.Entities;
using Print3DFinder.Core.Interfaces;

namespace Print3DFinder.Services
{
    /// <summary>
    /// Service de gestion des commandes d'impression 3D.
    /// Gère la création, la mise à jour et le suivi des commandes.
    /// </summary>
    public class OrderService : IOrderService
    {
        private readonly IApplicationDbContext _context;
        private readonly IEmailNotificationService _emailService;
        private readonly ILogger<OrderService> _logger;

        /// <summary>
        /// Initialise une nouvelle instance de <see cref="OrderService"/>.
        /// </summary>
        /// <param name="context">Le contexte de base de données</param>
        /// <param name="emailService">Le service de notification email</param>
        /// <param name="logger">Le logger pour enregistrer les événements</param>
        /// <exception cref="ArgumentNullException">
        /// Si l'un des paramètres est null
        /// </exception>
        public OrderService(
            IApplicationDbContext context,
            IEmailNotificationService emailService,
            ILogger<OrderService> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        /// <summary>
        /// Crée une nouvelle commande d'impression 3D.
        /// </summary>
        /// <param name="request">Les détails de la commande</param>
        /// <returns>La commande créée avec son identifiant unique</returns>
        /// <exception cref="ArgumentNullException">Si request est null</exception>
        /// <exception cref="ValidationException">Si les données sont invalides</exception>
        /// <exception cref="NotFoundException">Si le modèle 3D n'existe pas</exception>
        public async Task<Order> CreateOrderAsync(CreateOrderRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            _logger.LogInformation(
                "Creating order for user {UserId}, model {ModelId}",
                request.UserId,
                request.ModelId);

            try
            {
                // Valider que le modèle existe
                var model = await _context.Models
                    .FindAsync(request.ModelId)
                    ?? throw new NotFoundException($"Model {request.ModelId} not found");

                // Créer la commande
                var order = new Order
                {
                    Id = Guid.NewGuid(),
                    OrderNumber = GenerateOrderNumber(),
                    UserId = request.UserId,
                    ModelId = request.ModelId,
                    MaterialId = request.MaterialId,
                    Color = request.Color,
                    Quality = request.Quality,
                    Status = OrderStatus.PendingValidation,
                    TotalCost = CalculateTotalCost(model, request),
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                // Charger les relations pour l'email
                await LoadOrderRelationsAsync(order);

                // Envoyer notification à l'imprimeur
                await _emailService.SendNewOrderNotificationToAdminAsync(order, order.User);

                _logger.LogInformation(
                    "Order {OrderNumber} created successfully",
                    order.OrderNumber);

                return order;
            }
            catch (Exception ex) when (ex is not NotFoundException and not ValidationException)
            {
                _logger.LogError(
                    ex,
                    "Error creating order for user {UserId}",
                    request.UserId);
                throw;
            }
        }

        /// <summary>
        /// Génère un numéro de commande unique au format REF-YYYYMMDD-XXXXXXXX.
        /// </summary>
        /// <returns>Le numéro de commande généré</returns>
        private static string GenerateOrderNumber()
        {
            var date = DateTime.UtcNow.ToString("yyyyMMdd");
            var guid = Guid.NewGuid().ToString()[..8].ToUpperInvariant();
            return $"REF-{date}-{guid}";
        }

        /// <summary>
        /// Calcule le coût total de la commande.
        /// </summary>
        /// <param name="model">Le modèle 3D à imprimer</param>
        /// <param name="request">Les détails de la commande</param>
        /// <returns>Le coût total en euros</returns>
        private static decimal CalculateTotalCost(Model3D model, CreateOrderRequest request)
        {
            // Logique de calcul du coût
            // Basé sur le volume, le matériau, la qualité, etc.
            const decimal baseCostPerCm3 = 0.15m;
            var materialMultiplier = GetMaterialMultiplier(request.MaterialId);
            var qualityMultiplier = GetQualityMultiplier(request.Quality);

            var materialCost = model.Volume * baseCostPerCm3 * materialMultiplier;
            var totalCost = materialCost * qualityMultiplier;

            return Math.Round(totalCost, 2);
        }

        private static decimal GetMaterialMultiplier(Guid materialId)
        {
            // Implémentation simplifiée
            return 1.0m;
        }

        private static decimal GetQualityMultiplier(PrintQuality quality)
        {
            return quality switch
            {
                PrintQuality.Draft => 0.8m,
                PrintQuality.Standard => 1.0m,
                PrintQuality.HighQuality => 1.5m,
                _ => 1.0m
            };
        }

        private async Task LoadOrderRelationsAsync(Order order)
        {
            await _context.Entry(order).Reference(o => o.Model).LoadAsync();
            await _context.Entry(order).Reference(o => o.Material).LoadAsync();
            await _context.Entry(order).Reference(o => o.User).LoadAsync();
        }
    }
}
```

---

**Document d'Architecture Technique - Version 1.0**  
**Dernière mise à jour** : 17 décembre 2025  
**Statut** : Approuvé pour implémentation
