<header id="navbar" role="banner" class="navbar navbar-fixed-top">
  <div class="navbar-inner">
    <div class="container">
      <!-- .btn-navbar is used as the toggle for collapsed navbar content -->
      <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>

      <?php if ($logo): ?>
        <a class="logo pull-left" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
          <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
        </a>
      <?php endif; ?>

      <?php if ($site_name): ?>
        <h1 id="site-name">
          <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" class="brand"><?php print $site_name; ?></a>
        </h1>
      <?php endif; ?>

      <?php if ($primary_nav || $secondary_nav || !empty($page['navigation'])): ?>
        <div class="nav-collapse">
          <nav role="navigation">
            <?php if ($primary_nav): ?>
              <?php print render($primary_nav); ?>
            <?php endif; ?>
            <?php if (!empty($page['navigation'])): ?>
              <?php print render($page['navigation']); ?>
            <?php endif; ?>
            <?php if ($secondary_nav): ?>
              <?php print render($secondary_nav); ?>
            <?php endif; ?>
          </nav>
        </div>
      <?php endif; ?>
    </div>
  </div>
</header>

<header role="banner" id="page-header">

	<div class="container">
		<?php if ( $site_slogan ): ?>
		  <p class="lead"><?php print $site_slogan; ?></p>
		<?php endif; ?>

		<?php print render($page['header']); ?>
	</div>

</header> <!-- /#header -->

<div class="container">

  <div class="row">

    <?php if ($page['sidebar_first']): ?>
      <aside class="span3" role="complementary">
        <?php print render($page['sidebar_first']); ?>
      </aside>  <!-- /#sidebar-first -->
    <?php endif; ?>  
	
	<?php 
	$rtl = false;
	if(arg(0) == 'node' && is_numeric(arg(1))){
	$nid = arg(1);
	$node = node_load($nid);
	$languages = language_list();
		if (isset($languages[$node->language])) {
		$rtl = $languages[$node->language]->direction == LANGUAGE_RTL;
  // $direction = $languages[$node->language]->direction ? 'rtl' : 'ltr';
}} ?>

    <section class="<?php print _bootstrap_content_span($columns); ?>" <?php if ($rtl) { print "dir='rtl'"; } ?>>  
      <?php if ($page['highlighted']): ?>
        <div class="highlighted hero-unit"><?php print render($page['highlighted']); ?></div>
      <?php endif; ?>
      <!-- removing breadcrumb, benjamin@benway.dk -->
      <a id="main-content"></a>
      <?php print render($title_prefix); ?>
      <?php if ($title): ?>
        <h1 class="page-header"><?php print $title; ?></h1>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
      <?php print $messages; ?>
      <?php if ($tabs): ?>
        <?php print render($tabs); ?>
      <?php endif; ?>
      <?php if ($page['help']): ?> 
        <div class="well"><?php print render($page['help']); ?></div>
      <?php endif; ?>
      <?php if ($action_links): ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
	  
      <?php print render($page['content']); ?>
    </section>

    <?php if ($page['sidebar_second']): ?>
      <aside class="span3" role="complementary">
        <?php print render($page['sidebar_second']); ?>
      </aside>  <!-- /#sidebar-second -->
    <?php endif; ?>

  </div>
  
</div>



	
<footer class="footer">

<div class="container">

<div class="row">
 
	<?php if ($page['footer_firstcolumn'] || $page['footer_secondcolumn'] || $page['footer_thirdcolumn'] || $page['footer_fourthcolumn']): ?>

		<div class="span3">
        <?php print render($page['footer_firstcolumn']); ?>
		</div>
		
	  	<div class="span3">
        <?php print render($page['footer_secondcolumn']); ?>
		</div>

		<div class="span3">
        <?php print render($page['footer_thirdcolumn']); ?>
		</div>

		<div class="span3">
        <?php print render($page['footer_fourthcolumn']); ?>
		</div>
	
	<?php endif; ?>
	
</div>

<div>

    <?php print render($page['footer']); ?>
	
</div>

</div>
	
  </footer>
